const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { collection: "governmentform", versionKey: false }
);

module.exports = mongoose.model("governmentform", userSchema);
