const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
require("colors");
const morgan = require("morgan");
const connectDB = require("./config/config");
dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/orders", require("./routes/orderRoute"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `SERVING ON ${process.env.NODE_ENV} and mode on ${process.env.PORT}`
  );
});
