const { __prod__ } = require("../constants");

module.exports = function errorHandler(err, req, res, next) {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);
  console.dir(err);
  res.send({
    message: err.message,
    stack: __prod__ ? "🥞" : err.stack,
  });
};
