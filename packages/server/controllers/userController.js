const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET } = require("../config/constants");

const signUp = asyncHandler(async (req, res) => {
  const { confirmPassword, name, password } = req.body;
  //convert user email to lower case for more consistent data. Sometimes when the user logs in on phone the first letter will be capitalized.
  let email = req.body.email.toLowerCase();

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all of the fields.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with that information.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res
      .status(400)
      .json({ error: "Please fill in all the form fields" });
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid log in information.");
  }
});

//generate the JWT token.
const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  signUp,
  logIn,
};
