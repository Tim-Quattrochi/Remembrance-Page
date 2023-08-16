const asyncHandler = require("express-async-handler");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/constants");

const signUp = asyncHandler(async (req, res, next) => {
  const { confirmPassword, name, password, email } = req.body;
  if (!password || !name || !email || !confirmPassword) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields." });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ error: "Passwords must match." });
  }

  passport.authenticate("local-register", async (err, user, info) => {
    if (err) {
      return next(err);
    }

    //if there is a message in info it is an error from my done from passport.
    if (info && info.message) {
      return res.status(400).json({ error: info.message });
    }

    if (!user) {
      //if there is no user let's create one.
      let newUser = await User.create({
        email,
        name,
        hashedPass: confirmPassword,
      });
      await newUser.save();

      newUser = newUser.toJSON();
      delete newUser.password;

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        token: createToken(newUser._id),
      });
    }
  })(req, res, next);
});

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields." });
  }

  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      //info holds the messages from server/config/passport.js
      //from done.
      return res.status(401).json(info);
    }

    // Manually log in the user
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      // Authentication success
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        token: createToken(user._id),
      });
    });
  })(req, res, next);
};

//generate the JWT token.
const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

module.exports = {
  signUp,
  logIn,
};
