const express = require('express');
const { createServer } = require('http');
const Server = require('socket.io');
const dotenv = require('dotenv');
const volleyball = require('volleyball');

const connectToDB = require('./db');

dotenv.config();

(async () => {
  const app = express();
  const http = createServer(app);
  const io = new Server(http);

  app.use(express.json());

  app.use(volleyball);

  await connectToDB();

  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  const port = process.env.PORT || 1234;
  http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
