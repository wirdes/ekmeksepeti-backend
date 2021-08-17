const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name:String,
  description: String,
  image: String,
  type: Number,
  price: String,
  cooking_time: Number,
  protein: String,
  fat: String,
  carbohydrate: String,
  restaurant_id: {
    type: Schema.ObjectId,
    required: true,
    ref: "Resturant",
  },
});
module.exports = mongoose.model("Product", ProductSchema);
