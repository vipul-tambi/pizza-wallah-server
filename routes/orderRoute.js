if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const sk = process.env.SECRET_KEY;
const stripe = require("stripe")(sk);

router.post("/placeorder", async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.paymentIntents.create({
      amount: subTotal * 100,
      currency: "INR",
      customer: customer.id,
      receipt_email: token.email,
    });

    if (payment) {
      const name = currentUser.name;
      const email = currentUser.email;
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subTotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
      });

      await newOrder.save();

      res.send("Payment Success");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    // console.log("ERRRRRRRRRROR");
    res.status(400).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
});

router.post("/getuserorder", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
});

router.get("/alluserorder", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});

router.post("/deliverorder", async (req, res) => {
  const { orderid } = req.body;
  try {
    const order = await Order.findById(orderid);
    order.isDelivered = true;
    await order.save();
    res.status(200).send("Order Delivered Successfully");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});

module.exports = router;
