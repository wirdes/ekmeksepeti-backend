const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrdersSchema = new Schema({
  orderElements: [],
  orderTime: String,
  address: String,
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
});
module.exports = mongoose.model("Orders", OrdersSchema);
