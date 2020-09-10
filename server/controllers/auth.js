const User = require("../models/User");
const { hashPassword } = require("../utils/hash");
const { createToken } = require("../utils/jwt");

module.exports.loginPost = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken({ id: user._id });

    res.status(200).send({ user: user._id, token });
  } catch (err) {
    res.status(401).cookie("jwt", "", { maxAge: 1 });
    next(err);
  }
};

module.exports.signupPost = async (req, res, next) => {
  const { username, password, name } = req.body;

  try {
    const user = await User.create({
      username,
      name,
      password: await hashPassword(password),
    });

    const token = createToken({ id: user._id });

    res.status(201).send({ user: user._id, token });
  } catch (err) {
    res.status(422);
    if (err.code === 11000) {
      next(new Error("username already used"));
    } else {
      next(err);
    }
  }
};

module.exports.logoutDelete = async (req, res, next) => {
  res.send({});
};
