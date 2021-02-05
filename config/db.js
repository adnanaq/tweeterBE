const mongoose = require("mongoose");

// MongoURI
const mongoURI =
  "mongodb+srv://testDB:testDB@tweeterclone.1kbyo.mongodb.net/testDB?retryWrites=true&w=majority";

const initiateServer = async () => {
  try {
    // connection to the given URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = initiateServer;
