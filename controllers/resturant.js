const Resturant = require("../models/Restaurant");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const register = asyncHandler(async (req, res, next) => {
  const { name, address, phone, city, cityplateNumber } = req.body;
  const resturant = await Resturant.create({
    name,
    address,
    phone,
    city,
    cityplateNumber,
  });

  res.json({
    success: true,
    resturant: resturant,
  });
});

const findRestaurantByCityPlateNumber = asyncHandler(async (req, res, next) => {
  const plateNumber = req.body.plateNumber || req.query.plateNumber;
  const resturant = await Resturant.find({ cityplateNumber: plateNumber });
  res.json(resturant);
});

const restaurantDetails = asyncHandler(async (req, res, next) => {
  const id = req.body.id || req.query.id;
  const products = await Product.find({ _id: id });
  res.json({
    resturant: resturant,
    products: products,
  });
});

module.exports = {
  register,
  findRestaurantByCityPlateNumber,
  restaurantDetails,
};
