import createDomElms from "./createDomElms.js";
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
        createDomElms.createEditDocDom(doc, collection);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // UPDATE DOCUMENT
  update: e => {
    if (e.target.matches(".update")) {
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
        .then(response => console.log(response))
        .catch(err => {
          console.log(err);
        });
    }
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
      .then(response => console.log(response))
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
        createDomElms.createDocumentsDom(docs, collection, extras);
        extras = true;

        document.addEventListener("scroll", lazyload);

        skip += 20;
      })
      .catch(err => {
        console.log(err);
      });
  };
  return loadTwenty;
}