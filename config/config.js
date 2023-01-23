const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDb connected");
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

module.exports = connectDB;
