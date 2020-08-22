const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  throw new Error("Invalid login");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
