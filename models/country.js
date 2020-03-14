const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    continent: { type: String, required: true },
    region: { type: String, required: true },
    surfacearea: { type: Number, required: true },
    indepyear: { type: Number, required: true },
    population: { type: Number, required: true },
    lifeexpectancy: { type: Number, required: true },
    gnp: { type: Number, required: true },
    gnpold: { type: Number, required: true },
    localname: { type: String, required: true },
    governmentform: { type: String, required: true },
    headofstate: { type: String, required: true },
    capital: { type: Number, required: true },
    code2: { type: String, required: true }
  },
  { collection: "country", versionKey: false }
);

module.exports = mongoose.model("country", userSchema);
