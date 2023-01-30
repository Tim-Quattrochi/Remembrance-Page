module.exports = {
  ensureAuth: (req, res, next) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/guest-book");
    }
  },
};
