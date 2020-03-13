const express = require("express");
const router = express.Router();
const continentModel = require("./../models/continent");
const cityModel = require("./../models/city");
const countryModel = require("./../models/country");
const countrylanguageModel = require("./../models/countrylanguage");
const governmentformModel = require("./../models/governmentform");
const apiCtrl = require("./../controllers/api");

/* Retrieve documents from collection */
router.post("/api/:collection", apiCtrl.retrieve);

/* Create document to collection */
router.post("/api/:collection/create", apiCtrl.create);

/* Delete document from collection */
router.post("/api/:collection/:id/delete", apiCtrl.delete);

/* Update document from collection */
router.post("/api/:collection/:id/update", apiCtrl.update);

module.exports = router;
