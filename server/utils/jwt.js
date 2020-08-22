const jwt = require("jsonwebtoken");

const { JWT_MAX_AGE } = require("../constants");

const JWT_SECRET = process.env.JWT_SECRET || "bad secret";

function createToken(obj) {
  return jwt.sign(obj, JWT_SECRET, {
    expiresIn: JWT_MAX_AGE,
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
