const { CLIENT_HOME_PAGE_URL } = require("../config/constants");

module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.app.locals.user = req.user;
      return next();
    } else {
      res.redirect(CLIENT_HOME_PAGE_URL);
    }
  },
  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect(CLIENT_HOME_PAGE_URL);
    }
  },
};
