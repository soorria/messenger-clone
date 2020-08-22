const { verifyToken } = require("../utils/jwt");

module.exports.requireAuth = (req, res, next) => {
  function doError() {
    res.status(401);
    next(new Error("user not logged in"));
  }

  const token = req.cookies.jwt;
  console.log(token);

  if (token) {
    try {
      const decoded = verifyToken(token);
      res.locals.userId = decoded.id;
      next();
    } catch (err) {
      doError();
    }
  } else {
    doError();
  }
};
