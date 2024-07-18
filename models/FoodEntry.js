const mongoose = require("mongoose");

const FoodEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  food: { type: String, required: false },
  cost: { type: Number, required: true },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true,
  },
});

module.exports = mongoose.model("FoodEntry", FoodEntrySchema);
