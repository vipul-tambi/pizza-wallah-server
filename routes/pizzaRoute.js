const express = require("express");
const router = express.Router();
const pizzaModel = require("../models/pizzaModel");

router.get("/getAllPizzas", async (req, res) => {
  try {
    const pizzas = await pizzaModel.find({});
    res.send(pizzas);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/addpizza", async (req, res) => {
  const { pizza } = req.body;
  try {
    const newPizza = new pizzaModel({
      name: pizza.name,
      image: pizza.image,
      varients: ["small", "medium", "large"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    await newPizza.save();
    res.status(201).send("New Pizza Added ");
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/getpizzabyid", async (req, res) => {
  const { pizzaId } = req.body;
  try {
    const pizza = await pizzaModel.findById(pizzaId);
    res.send(pizza);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/updatepizza", async (req, res) => {
  const updatedPizza = req.body.updatedPizza;
  try {
    const pizza = await pizzaModel.findOne({ _id: updatedPizza._id });
    (pizza.name = updatedPizza.name),
      (pizza.description = updatedPizza.description),
      (pizza.image = updatedPizza.image),
      (pizza.category = updatedPizza.category),
      (pizza.prices = [updatedPizza.prices]);
    await pizza.save();
    res.status(200).send("Pizza Update Success");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/deletepizza", async (req, res) => {
  const pizzaId = req.body.pizzaId;
  try {
    await pizzaModel.findByIdAndDelete({ _id: pizzaId });
    res.status(200).send("Pizza deleted");
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
module.exports = router;
