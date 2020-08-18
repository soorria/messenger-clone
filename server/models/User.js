const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserSchema);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async (username, password) => {
  const user = await User.findOne({ username });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  throw new Error('Invalid login');
};

module.exports = User;
