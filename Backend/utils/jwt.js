const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "48h" });
};

const checkToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  createToken,
  checkToken,
};
