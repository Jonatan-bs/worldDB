// field types
const createElm = {
  /*
  args{
    id: string (optional)
    class: string (optional)
  }
  */
  button(args) {
    if (!args) args = {};

    let button = document.createElement("button");
    if (args.class) {
      button.className = args.class;
    }
    if (args.id) {
      button.id = args.id;
    }
    button.textContent = args.text;

    return button;
  },
  /*
  args{
    id: string (optional)
    class: string (optional)
  }
  */
  form(args) {
    if (!args) args = {};

    let form = document.createElement("form");
    if (args.class) {
      form.className = args.class;
    }
    if (args.id) {
      form.id = args.id;
    }
    return form;
  },
  /*
  args{
    id: string (optional)
    class: string (optional)
  }
  */
  div(args) {
    if (!args) args = {};

    let div = document.createElement("div");
    if (args.class) {
      div.className = args.class;
    }
    if (args.id) {
      div.id = args.id;
    }
    if (args.data) {
      div.setAttribute("data-" + args.data.name, args.data.value);
    }
    return div;
  },
  /*
  args{ 
    label : { text: string, for: string}
  }
  */
  label(args) {
    if (!args) args = {};

    let label = document.createElement("label");
    label.textContent = args.text;
    label.htmlFor = args.for;

    return label;
  },

  /*
  args{ 
    type : string // radio,checkbox,date,file,number,text
    name : string  
    id: string (optional)
    class: string (optional)
  }
  */
  input(args) {
    if (!args) args = {};
    if (
      args.type === "date" ||
      args.type === "file" ||
      args.type === "number" ||
      args.type === "text" ||
      args.type === "textArea" ||
      args.type === "checkbox" ||
      args.type === "radio" ||
      args.type === "hidden"
    ) {
      let input = document.createElement("input");
      if (args.class) {
        input.className = args.class;
      }
      if (args.id) {
        input.id = args.id;
      }
      if (args.value) {
        input.value = args.value;
      }
      if (args.checked) {
        input.checked = args.checked;
      }
      if (args.placeholder) {
        input.placeholder = args.placeholder;
      }
      if (args.disabled) {
        input.disabled = true;
      }
      input.type = args.type;
      input.name = args.name;
      return input;
    }
  },
  /* 
  args {
    id: string (optional)
    class: string (optional)
    name: string
    options: [value,value...]
  }
  */
  select(args) {
    if (!args) args = {};

    let select = document.createElement("select");
    if (args.class) {
      select.className = args.class;
    }
    if (args.id) {
      select.id = args.id;
    }
    select.name = args.name;

    args.options.forEach(keyVal => {
      let option = document.createElement("option");
      option.value = keyVal.val;
      option.textContent = keyVal.text;
      select.appendChild(option);
    });
    return select;
  },
  link(args) {
    if (!args) args = {};

    let link = document.createElement("a");
    if (args.class) {
      link.className = args.class;
    }
    if (args.id) {
      link.id = args.id;
    }
    link.href = args.href;
    link.textContent = args.text;

    link.name = args.name;

    return link;
  },
  par(args) {
    if (!args) args = {};

    let par = document.createElement("p");
    if (args.data) {
      par.setAttribute(args.data.name, args.data.value);
    }
    par.textContent = args.text;
    return par;
  },
  // Create dom elements for documents
  createDocumentsDom(docs, collection) {
    const target = document.querySelector("#content");
    target.innerHTML = "";
    docs.forEach(doc => {
      const wrap = this.div({
        class: "document",
        data: { name: "id", value: doc._id }
      });
      wrap.setAttribute("data-collection", collection);

      for (const key in doc) {
        if (key === "_id") continue;

        const value = doc[key];
        const par = this.par({
          text: `${key}: ${value}`
        });

        wrap.append(par);
      }
      target.append(wrap);
    });
  },

  // Create dom elements for selected document
  createEditDocDom(doc, collection) {
    doc = doc[0];
    const target = document.querySelector("#content");
    target.innerHTML = "";

    let docWrap = this.div({ id: "docWrap" });
    target.append(docWrap);

    let button = this.button({ class: "update", text: "Update" });
    docWrap.append(button);

    button = this.button({ class: "delete", text: "Delete" });
    docWrap.append(button);

    let field = this.input({
      type: "hidden",
      name: "collection",
      value: collection
    });
    docWrap.append(field);

    for (const key in doc) {
      const value = doc[key];
      if (key === "_id") {
        field = this.input({
          type: "hidden",
          name: "_id",
          value: value
        });
      } else {
        field = this.input({ type: "text", name: key, value: value });
      }
      docWrap.append(field);
    }
  }
};

export default createElm;
