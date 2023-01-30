const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signUp, logIn } = require("../controllers/userController");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    console.log(req);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log(req.user);
    res.redirect("http://localhost:3000/guest-book");
  }
);

// router.post("/", signUp);
// router.post("/login", logIn);

module.exports = router;
