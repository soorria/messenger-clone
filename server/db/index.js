const mongoose = require('mongoose');

async function connectToDB() {
  const { MONGO_URI } = process.env;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log('Error connecting to MongoDB:');
    throw err;
  }
}

module.exports = connectToDB;
