import api from "./api.js";

document.addEventListener("click", e => {
  // GET ALL DOCUMENTS FROM COLLECTION
  if (e.target.matches(".collection")) {
    api.getAll(e);
  }
  // INIT UPDATE PAGE
  if (e.target.parentNode.matches(".document")) {
    api.getOne(e);
  }
  // UPDATE DOCUMENT
  if (e.target.matches(".update")) {
    api.update(e);
  }
  // INIT CREATE PAGE
  if (e.target.matches(".create")) {
    api.setFields(e);
  }
  // CREATE DOCUMENT
  if (e.target.matches(".createNew")) {
    api.create(e);
  }

  // DELETE DOCUMENT
  if (e.target.matches(".delete")) {
    api.delete(e);
  }
});
