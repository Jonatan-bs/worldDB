import createElm from "./form.js";

document.addEventListener("click", e => {
  // GET ALL DOCUMENTS FROM COLLECTION
  if (e.target.matches(".collection")) {
    let collection = e.target.dataset.collection;

    let body = {
      query: {},
      fields: "",
      options: { limit: 20 }
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
        createDocumentsDom(docs, collection);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // GET "EDIT PAGE" FOR SINGLE DOCUMENT
  if (e.target.parentNode.matches(".document")) {
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
        createEditDocDom(doc, collection);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // UPDATE DOCUMENT
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

  // UPDATE DOCUMENT
  if (e.target.matches(".delete")) {
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
});

function createEditDocDom(doc, collection) {
  doc = doc[0];
  const target = document.querySelector("#content");
  target.innerHTML = "";

  let docWrap = createElm.div({ id: "docWrap" });
  target.append(docWrap);

  let button = createElm.button({ class: "update", text: "Update" });
  docWrap.append(button);

  button = createElm.button({ class: "delete", text: "Delete" });
  docWrap.append(button);

  let field = createElm.input({
    type: "hidden",
    name: "collection",
    value: collection
  });
  docWrap.append(field);

  for (const key in doc) {
    const value = doc[key];
    if (key === "_id") {
      field = createElm.input({ type: "hidden", name: "_id", value: value });
    } else {
      field = createElm.input({ type: "text", name: key, value: value });
    }
    docWrap.append(field);
  }
}

function createDocumentsDom(docs, collection) {
  const target = document.querySelector("#content");
  target.innerHTML = "";
  docs.forEach(doc => {
    const wrap = createElm.div({
      class: "document",
      data: { name: "id", value: doc._id }
    });
    wrap.setAttribute("data-collection", collection);

    for (const key in doc) {
      if (key === "_id") continue;

      const value = doc[key];
      const par = createElm.par({
        text: `${key}: ${value}`
      });

      wrap.append(par);
    }
    target.append(wrap);
  });
}
