import createDomElms from "./createDomElms.js";
import msg from "./message.js";

let datatypes = {
  Number: "number",
  String: "text"
};

let lazyload;

export default {
  // GET DOCUMENTS FROM COLLECTION
  getAll: e => {
    let collection = e.target.dataset.collection;

    let loadmore = loadMoreConst(collection);
    loadmore();
  },
  // GET "EDIT PAGE" FOR SINGLE DOCUMENT
  getOne: e => {
    document.removeEventListener("scroll", lazyload);

    let id = e.target.parentNode.dataset.id;
    let collection = e.target.parentNode.dataset.collection;

    let body = {
      query: { _id: id },
      fields: "",
      options: { limit: 1 }
    };

    fetch("http://localhost:3000/api/" + collection, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(doc => {
        createDomElms.createEditDocDom(doc[0], collection);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // UPDATE DOCUMENT
  update: e => {
    if (emptyFields()) {
      return msg("All fields are required", 2);
    }
    let docWrap = document.querySelector("#docWrap");
    let inputs = docWrap.querySelectorAll("input");
    let id;
    let collection;

    let body = {};
    inputs.forEach(input => {
      if (input.name === "_id") {
        id = input.value;
      } else if (input.name === "collection") {
        collection = input.value;
      } else {
        body[input.name] = input.value;
      }
    });

    fetch("http://localhost:3000/api/" + collection + "/" + id + "/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
        if (response.nModified) {
          msg("Document was updated", 0);
        } else {
          msg("No change in document", 1);
        }
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },

  // DELETE DOCUMENT
  delete: e => {
    let docWrap = document.querySelector("#docWrap");
    let inputs = docWrap.querySelectorAll("input");
    let id;
    let collection;

    let body = {};
    inputs.forEach(input => {
      if (input.name === "_id") {
        id = input.value;
      } else if (input.name === "collection") {
        collection = input.value;
      }
    });

    fetch("http://localhost:3000/api/" + collection + "/" + id + "/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
        if (response.deletedCount) {
          msg("Document deleted", 0);
        }
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // INIT CREATE PAGE
  setFields: e => {
    document.removeEventListener("scroll", lazyload);

    let collection = e.target.dataset.collection;
    fetch("/api/schema/" + collection, {
      method: "post"
    })
      .then(response => response.json())
      .then(schema => {
        const target = document.querySelector("#content");
        target.innerHTML = "";

        let docWrap = createDomElms.div({
          id: "docWrap"
        });
        target.append(docWrap);

        let button = createDomElms.button({
          text: "Save",
          class: "createNew"
        });
        button.setAttribute("data-collection", collection);

        docWrap.append(button);
        for (const key in schema) {
          if (schema.hasOwnProperty(key)) {
            const field = schema[key];
            if (field.path === "_id" || field.path === "__v") continue;
            const fieldWrap = createDomElms.div({ class: "field" });
            docWrap.append(fieldWrap);

            let name = field.path;
            let inputType = datatypes[field.instance];
            let label = createDomElms.label({
              for: name,
              text: name
            });
            fieldWrap.append(label);
            let br = document.createElement("br");
            fieldWrap.append(br);

            let input = createDomElms.input({
              type: inputType,
              name: name
            });
            fieldWrap.append(input);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  // CREATE DOCUMENT
  create: e => {
    if (emptyFields()) {
      return msg("All fields are required", 2);
    }
    let docWrap = document.querySelector("#docWrap");
    let inputs = docWrap.querySelectorAll("input");
    let collection = e.target.dataset.collection;

    let body = {};
    inputs.forEach(input => {
      body[input.name] = input.value;
    });
    fetch("http://localhost:3000/api/" + collection + "/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "Document created") {
          msg("Document created", 0);
        }
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

// check if scrolled to bottom of content div
function bottomOfDiv() {
  const contDiv = document.querySelector("#content");
  var bounding = contDiv.getBoundingClientRect();

  if (
    bounding.bottom <=
    (window.innerHeight || document.documentElement.clientHeight)
  ) {
    return true;
  }
}

// Load Extra documents
function loadMoreConst(collection) {
  let skip = 0;
  let extras = false;
  let loadTwenty = () => {
    document.removeEventListener("scroll", lazyload);

    lazyload = () => {
      if (bottomOfDiv()) {
        loadTwenty();
      }
    };

    let body = {
      query: {},
      fields: "",
      options: { limit: 20, skip: skip }
    };

    fetch("http://localhost:3000/api/" + collection, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(docs => {
        createDomElms.createDocumentsDom(docs[0], collection, extras);
        extras = true;
        if (docs[0].length === 20) {
          document.addEventListener("scroll", lazyload);

          skip += 20;
          if (bottomOfDiv()) {
            loadTwenty();
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return loadTwenty;
}

// check if empty fields or wrong datatype
function emptyFields() {
  let docWrap = document.querySelector("#docWrap");
  let inputs = docWrap.querySelectorAll("input");
  let empty = false;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.value == "") {
      empty = true;
      input.classList.add("focus");
    } else {
      input.classList.remove("focus");
    }
  }
  return empty;
}
