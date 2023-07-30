const { NODE_ENV } = require("../config/constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
