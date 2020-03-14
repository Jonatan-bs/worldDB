import api from "./api.js";

document.addEventListener("click", e => {
  // GET ALL DOCUMENTS FROM COLLECTION
  if (e.target.matches(".collection p")) {
    api.getAll(e);

    document.querySelectorAll(".collection").forEach(col => {
      if (col.classList.contains("selected")) {
        col.classList.remove("selected");
      }
    });
    e.target.parentNode.classList.add("selected");
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

  // RELOAD PAGE ON GIF CLICK
  if (
    e.target.matches("#worldGifWrap") ||
    e.target.matches("#worldGifWrap img")
  ) {
    location.reload();
  }
});
