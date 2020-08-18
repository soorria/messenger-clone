module.exports = function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found ${req.originalUrl}`);
  console.error(error);
  next(error);
};
