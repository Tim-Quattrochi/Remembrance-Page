const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    uid: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    picture: {
      type: String,
    },
    password: {
      type: String,
    },

    role: {
      type: String,

      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
