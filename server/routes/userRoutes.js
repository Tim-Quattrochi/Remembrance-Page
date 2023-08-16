const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureGuest } = require("../middleware/ensureAuth");
const { logIn, signUp } = require("../controllers/userController");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    req.session.user = req.user;
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    passReqToCallback: true,
    failureRedirect: "/",
  }),
  (req, res) => {
    req.session.user = req.user;

    res.redirect("http://localhost:5173/");
  }
);

router.get("/user", (req, res) => {
  if (!req.session.user || !req.session.passport.user) {
    return res.status(404).json({ error: "No session found." });
  } else {
    let user = req.session.user;

    delete user.password;
    delete user.__v;

    return res.status(200).json(user);
  }
});

router.get("/login", (req, res) => {
  res.json(req.session.user);
});

router.post("/user/register", signUp);

router.post("/user/login", logIn);

router.post("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session = null;
    res.clearCookie("connect.sid");

    res.sendStatus(200);
  });
});

module.exports = router;
