const { JWT_EXPIRES_IN, JWT_SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");

//generate the JWT token.

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

module.exports = createToken;
