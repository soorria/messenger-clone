module.exports = function errorHandler(err, req, res, next) {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);
  console.log(err);
  res.send({
    message: err.message,
    stack: err.stack,
  });
};
