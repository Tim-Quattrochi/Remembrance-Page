module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.app.locals.user = req.user;
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: (req, res, next) => {
    console.log(req);
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
};
