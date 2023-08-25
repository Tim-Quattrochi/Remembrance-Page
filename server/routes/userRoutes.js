const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  ensureGuest,
  ensureAuth,
} = require("../middleware/ensureAuth");
const { logIn, signUp } = require("../controllers/userController");
const createToken = require("../config/genJWT");
const { CLIENT_HOME_PAGE_URL } = require("../config/constants");



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
    failureRedirect: CLIENT_HOME_PAGE_URL,
  }),
  (req, res) => {
    req.session.user = req.user;

    res.redirect(CLIENT_HOME_PAGE_URL);
  }
);

router.get("/user", ensureAuth, (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated." });
  } else {
    let user = req.user.toObject();

    delete user.password;
    delete user.__v;
    delete user.picture;
    delete user.createdAt;
    delete user.updatedAt;

    user.token = createToken(user._id);

    return res.status(200).json(user);
  }
});

router.post("/user/register", ensureGuest, signUp);

router.post("/user/login", ensureGuest, logIn);

router.post("/logout", ensureAuth, function (req, res, next) {
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
