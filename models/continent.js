const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { collection: "continent", versionKey: false }
);

module.exports = mongoose.model("continent", userSchema);
