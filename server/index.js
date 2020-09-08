const express = require("express");
const { createServer } = require("http");
const Server = require("socket.io");
const dotenv = require("dotenv");
const volleyball = require("volleyball");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");

const connectToDB = require("./db");
const allRoutes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const chatSocket = require("./controllers/chat-socket");
const { verifyToken } = require("./utils/jwt");
const Chat = require("./models/Chat");
const { userDelete } = require("./controllers/users");
const { createChat } = require("./controllers/chat");

dotenv.config();

const userIdToSocket = new Map();

const origin = process.env.WEB_URL || "http://localhost:3000";

(async () => {
  const app = express();
  const http = createServer(app);

  // JSON Body parser
  app.use(express.json());
  // Cookie Parser
  app.use(cookieParser());

  // Logger
  app.use(volleyball);

  // Header stuff
  app.use(helmet());
  app.use(
    cors({
      origin
      credentials: true,
    })
  );

  // Add routes
  app.use(allRoutes);

  // Connect to MongoDB with mongoose
  await connectToDB();

  const io = new Server(http, {
    origins: [origin],
  });

  // Socket connection
  io.on("connection", async (socket) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie);

    let userId;

    try {
      userId = verifyToken(cookies.jwt).id;
    } catch (err) {
      socket.disconnect(true);
      return;
    }

    socket.on("disconnect", () => {
      userIdToSocket.delete(userId);
    });

    userIdToSocket.set(userId, socket);

    const userChats = await Chat.find({
      members: { $elemMatch: { $eq: userId } },
    });

    userChats.forEach((c) => {
      socket.join(c._id);
    });

    socket.on("chat message", async ({ chatId, message }) => {
      if (!message) return;
      try {
        const targetChat = await Chat.findById(chatId);
        const newMessage = {
          body: message,
          sender: userId,
          date: Date.now(),
        };
        targetChat.messages.push(newMessage);
        await targetChat.save();
        io.to(chatId).emit("chat message", chatId, newMessage);
      } catch (err) {
        console.log(err);
        io.to(socket.id).emit("error", {
          message:
            "An error occurred while sending your message. Please try again later.",
        });
      }
    });

    socket.on("create chat", async ({ name, members }) => {
      if (!name || new Set(members).size < 2) return;
      try {
        const newChat = await createChat(members, name);
        socket.join(newChat._id);
        newChat.members.forEach(({ _id: id }) => {
          if (userIdToSocket.has(id.toString()) && id != userId) {
            console.log("connected new member");
            userIdToSocket.get(id.toString()).join(newChat._id);
          }
        });
        io.to(newChat._id).emit("create chat", newChat);
      } catch (err) {
        console.log(err);
        io.to(socket.id).emit("error", {
          message:
            "An error occurred while creating your chat. Please try again later.",
        });
      }
    });
  });

  // Default route handler
  app.use(notFound);

  // Default error handler
  app.use(errorHandler);

  const port = process.env.PORT || 1234;
  http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
