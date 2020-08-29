const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const sleep = require("../utils/sleep");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: [(u) => !!u, "username must have at least 1 character"],
  },
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    validate: [(p) => p.length > 0, "password must have at least 1 character"],
  },
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  await sleep(1000);
  throw new Error("Invalid login");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
