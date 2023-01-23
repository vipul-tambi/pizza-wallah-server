const mongoose = require("mongoose");
const connectDB = require("./config/config");
const dotenv = require("dotenv");
const Pizzas = require("./data/pizza-data");
const Pizza = require("./models/pizzaModel");

dotenv.config();
connectDB();
const importData = async () => {
  try {
    await Pizza.deleteMany();
    const sampledata = Pizzas.map((pizza) => {
      return { ...pizza };
    });

    const data = await Pizza.insertMany(sampledata);
    console.log(`${data}`);
  } catch (error) {
    console.log(`${error}`);
  }
};

importData();
