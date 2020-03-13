import api from "./api.js";

document.addEventListener("click", e => {
  // GET ALL DOCUMENTS FROM COLLECTION
  if (e.target.matches(".collection")) {
    api.getAll(e);
  }
  // GET "EDIT PAGE" FOR SINGLE DOCUMENT
  if (e.target.parentNode.matches(".document")) {
    api.getOne(e);
  }
  // UPDATE DOCUMENT
  if (e.target.matches(".update")) {
    api.update(e);
  }

  // DELETE DOCUMENT
  if (e.target.matches(".delete")) {
    api.delete(e);
  }
});
