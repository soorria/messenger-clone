const User = require("../models/User");
const { hashPassword } = require("../utils/hash");
const { createToken } = require("../utils/jwt");
const { JWT_MAX_AGE } = require("../constants");

module.exports.loginPost = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    res
      .cookie("jwt", createToken({ id: user._id }), {
        httpOnly: true,
        maxAge: JWT_MAX_AGE * 1000,
        sameSite: "lax",
      })
      .status(200)
      .send({ user: user._id });
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

    res
      .cookie("jwt", createToken({ id: user._id }), {
        httpOnly: true,
        maxAge: JWT_MAX_AGE * 1000,
        sameSite: "lax",
      })
      .status(201)
      .send({ user: user._id });
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
  res.cookie("jwt", "", { maxAge: 1 }).send({});
};
