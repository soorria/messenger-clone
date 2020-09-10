const { verifyToken } = require("../utils/jwt");

const requireAuth = (req, res, next) => {
  checkAuth(req, res);

  if (!res.locals.userId) {
    next(new Error("user not logged in"));
  }

  next();
};
module.exports.requireAuth = requireAuth;

const checkAuth = (req, res, next) => {
  const [type, token] = req.get("authorization")?.split(" ") || [];

  if (token && type.toLowerCase() === "bearer") {
    try {
      const decoded = verifyToken(token);
      res.locals.userId = decoded.id;
    } catch (err) {
      res.locals.userId = null;
    }
  } else {
    res.locals.userId = null;
  }

  console.log(token, res.locals);

  if (next) next();
};
module.exports.checkAuth = checkAuth;
