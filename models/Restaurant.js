const mongoose = require("mongoose");
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  name: { type: String, required: [true, "Lütfen bir isim giriniz"] },
  address: { type: String, required: [true, "Lütfen bir adres giriniz"] },
  city: {type:String,required: [true, "Lütfen bir şehir giriniz"] },
  phone: {
    type: String,
    required: [true, "Lütfen bir telefon numarası giriniz"],
  },
  admin: { type: Schema.ObjectId, ref: "Admin" },
  picture:{ type:String, default : "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
  qr:String,
});
module.exports = mongoose.model("Resturant", RestaurantSchema);
