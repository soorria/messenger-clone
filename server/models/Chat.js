const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  body: String,
  sender: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  name: { type: String, default: "New Chat" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  messages: [MessageSchema],
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
