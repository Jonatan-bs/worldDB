const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { collection: "continent" }
);

module.exports = mongoose.model("continent", userSchema);
