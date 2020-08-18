const User = require('../models/User');
const { createToken } = require('../utils/jwt');
const { JWT_MAX_AGE } = require('../constants');

module.exports.loginPost = async (req, res, next) => {
  const {username, password} = req.body;

  try {
    const user = await User.login(username, password);

    res.cookie('jwt', createToken({ id: user._id }), {
      httpOnly: true,
      maxAge: JWT_MAX_AGE * 1000,
    });
    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(401);
    next(err);
  }
};

module.exports.signupPost = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });

    res.cookie('jwt', createToken({ id: user._id }), {
      httpOnly: true,
      maxAge: JWT_MAX_AGE * 1000,
    });
    res.status(201).send({ user: user._id });
  } catch (err) {
    res.status(422);
    next(err);
  }
};
