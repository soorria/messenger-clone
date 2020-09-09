const mongoose = require("mongoose");

async function connectToDB() {
  const { MONGO_URI } = process.env;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
    process.exit(1);
  }

  console.log("connected to MongoDB");
}

module.exports = connectToDB;
