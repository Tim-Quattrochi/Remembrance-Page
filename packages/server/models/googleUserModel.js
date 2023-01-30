const mongoose = require("mongoose");

const googleUserSchema = mongoose.Schema({
  uid: {
    type: String,
  },
  token: {
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

  roles: [
    {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
  ],
});

module.exports = mongoose.model("googleUser", googleUserSchema);
