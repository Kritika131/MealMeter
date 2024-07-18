const express = require("express");
const router = express.Router();
const FoodEntry = require("../models/FoodEntry");

// Get all food entries
router.get("/", async (req, res) => {
  try {
    const entries = await FoodEntry.find();
    const total = entries.reduce((sum, entry) => sum + entry.cost, 0);
    res.json({ entries, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new food entry
router.post("/", async (req, res) => {
  // console.log("req.body:::::::", req.body);
  const { date, food, cost, mealType } = req.body;
  const entry = new FoodEntry({ date, food, cost, mealType });
  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a food entry
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, food, cost, mealType } = req.body;
  try {
    const updatedEntry = await FoodEntry.findByIdAndUpdate(
      id,
      { date, food, cost, mealType },
      { new: true }
    );
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a food entry
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await FoodEntry.findByIdAndDelete(id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
