const express = require('express');
const { createServer } = require('http');
const Server = require('socket.io');
const dotenv = require('dotenv');
const volleyball = require('volleyball');
const cors = require('cors');
const helmet = require('helmet');

const cookieParser = require('cookie-parser');
const connectToDB = require('./db');
const allRoutes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

(async () => {
  const app = express();
  const http = createServer(app);
  const io = new Server(http);

  // JSON Body parser
  app.use(express.json());
  // Cookie Parser
  app.use(cookieParser());

  // Logger
  app.use(volleyball);

  // Header stuff
  app.use(helmet());
  app.use(cors());

  // Add routes
  app.use(allRoutes);

  // Connect to MongoDB with mongoose
  await connectToDB();

  // Socket connection
  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
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
