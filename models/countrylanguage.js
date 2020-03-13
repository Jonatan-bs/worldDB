const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    countrycode: { type: Number, required: true },
    language: { type: String, required: true },
    isofficial: { type: String, required: true },
    percentage: { type: Number, required: true }
  },
  { collection: "countrylanguage" }
);

module.exports = mongoose.model("countrylanguage", userSchema);
