const User = require("../models/User");

module.exports.usersGetAll = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.send({ users });
  } catch (err) {
    next(err);
  }
};

module.exports.userGetById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.send({ user });
    }

    res.status(404);
    next(new Error("user does not exist"));
  } catch (err) {
    next(err);
  }
};

module.exports.userDelete = async (req, res, next) => {
  if (res.locals.userId !== req.params.id) {
    res.status(403);
    next(new Error("user not authorized"));
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id).select(
      "-password"
    );

    if (user) {
      res.status(204).send({});
    }

    res.status(404);
    next(new Error("user does not exist"));
  } catch (err) {
    next(err);
  }
};
