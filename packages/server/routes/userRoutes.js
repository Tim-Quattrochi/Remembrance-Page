const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signUp, logIn } = require("../controllers/userController");
const { ensureGuest } = require("../middleware/ensureAuth");

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
    console.log("HUH", req.user);
    req.session.user = req.user;
    res.redirect("http://localhost:3000/guest-book");
  }
);

router.get("/user", (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.session.user);
  res.json(req.session.user);
});

const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.post("/logout", function (req, res, next) {
  console.log(req.isAuthenticated());
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session = null;
    res.clearCookie("connect.sid");

    res.redirect(CLIENT_HOME_PAGE_URL);
  });
});
// router.post("/", signUp);
// router.post("/login", logIn);

module.exports = router;
