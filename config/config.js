const mongoose = require("mongoose");
require("colors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected");
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

module.exports = connectDB;
