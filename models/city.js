const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    oldid: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    countrycode: { type: String, required: true },
    district: { type: String, required: true },
    population: { type: Number, required: true }
  },
  { collection: "city", versionKey: false }
);

module.exports = mongoose.model("city", userSchema);
