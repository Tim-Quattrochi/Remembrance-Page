const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
  },
  roles: [
    {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
