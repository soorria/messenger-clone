const Chat = require("../models/Chat");

module.exports.chatGetAll = async (req, res, next) => {
  const query = Chat.find({
    members: { $elemMatch: { $eq: res.locals.userId } },
  });

  if (req.query.no_messages === "true") {
    query.select("-messages");
  }

  if (req.query.populate === "true") {
    query.populate("members");
  }

  const chats = await query.exec();
  res.send({ chats });
};

module.exports.chatGetById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .select("-messages")
      .populate("members");

    if (!chat.members.find((m) => m._id === res.locals.userId)) {
      res.status(403);
      next(new Error("user not in chat"));
    }

    if (chat) {
      res.send({ chat });
    }

    res.status(404);
    next(new Error("chat does not exist"));
  } catch (err) {
    res.status(404);
    next(new Error("chat does not exist"));
  }
};

module.exports.chatMessagesGet = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (chat && chat.members.find((e) => e == res.locals.userId)) {
      res.send({ messages: chat.messages });
      return;
    }

    res.status(404);
    next(new Error("chat does not exist"));
  } catch (err) {
    res.status(404);
    next(new Error("chat does not exist"));
  }
};

module.exports.createChat = async function createChat(members, name) {
  const newChat = await Chat.create({
    name,
    members,
  });
  newChat.populate("members").execPopulate();
  return newChat;
};

module.exports.chatPost = async (req, res, next) => {
  const { name, members } = req.body;

  if (!Array.isArray(members)) {
    next(new Error("members must be an array of user ids"));
  }

  if (!members || new Set(members).size < 2) {
    next(new Error("chat must have at least 2 members"));
  }

  try {
    const newChat = await createChat(members, name);
    res.status(201).send(await Chat.findById(newChat._id).populate("members"));
  } catch (err) {
    next(new Error("invalid type for name or members"));
  }
};

module.exports.chatPatch = async (req, res, next) => {
  const { id, name } = req.body;

  try {
    const chat = await Chat.findById(id);
    chat.name = name || chat.name;
    await chat.save();
    res.send({ chat });
  } catch (err) {
    next(new Error("chat does not exist"));
  }
};
