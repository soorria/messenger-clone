const express = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");
const chatRouter = require("./chat.js");

const router = express.Router();

router.use("/", authRouter);
router.use("/users", usersRouter);
router.use("/chat", chatRouter);

module.exports = router;
