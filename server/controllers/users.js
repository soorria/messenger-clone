const User = require("../models/User");

module.exports.usersGetAll = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send({ users });
  } catch (err) {
    next(err);
  }
};

module.exports.usersGetMe = async (req, res, next) => {
  if (res.locals.userId) {
    try {
      const user = await User.findById(res.locals.userId);
      res.status(200).send({ user });
    } catch (err) {
      res.status(200).send({ user: null });
    }
  } else {
    res.status(200).send({ user: null });
  }
  res.status(200);
};

module.exports.usersGetById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.send({ user });
    }

    res.status(404);
    next(new Error("user does not exist"));
  } catch (err) {
    res.status(404);
    next(new Error("user does not exist"));
  }
};

module.exports.userDelete = async (req, res, next) => {
  if (res.locals.userId !== req.params.id) {
    res.status(403);
    next(new Error("user not authorized"));
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      res.status(204).send({});
    }

    res.status(404);
    next(new Error("user does not exist"));
  } catch (err) {
    next(err);
  }
};
