const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please supply a name to create an account."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "An email is required to register"],
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

userSchema
  .virtual("hashedPass")
  .get(function () {
    return this._password;
  })
  .set(function (value) {
    this._password = value;
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(value, salt);
  });

userSchema.methods.comparePassword = async function (password) {
  const doesPassMatch = await bcrypt.compare(password, this.password);
  return doesPassMatch;
};

module.exports = mongoose.model("User", userSchema);
