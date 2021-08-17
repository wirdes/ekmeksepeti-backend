const Resturant = require("../models/Restaurant");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const Product = require("../models/Product");

const register = asyncHandler(async (req, res, next) => {
  const { name, address, phone } = req.body;
  const resturant = await Resturant.create({
    name,
    address,
    phone,
    city,
    admin: "6093e642359268342ce3331b",
  });

  res.json({
    success: true,
    resturant: resturant,
  });
});

const findRestaurantByAdmin = asyncHandler(async (req, res, next) => {
  const admin = req.body.id || req.query.id;
  res.json(await Resturant.find({ admin: admin }));
});

//
const findRestaurant = asyncHandler(async (req, res, next) => {
  const admin = req.body.id || req.query.id;
  const resturant = await Resturant.find({ admin: admin });
  res.json(resturant);
});

const allResturant = asyncHandler(async (req, res, next) => {
  res.json(await Resturant.find());
});

const restaurantDetails = asyncHandler(async (req, res, next) => {
  const admin = req.body.id || req.query.id;
  const resturant=await Resturant.find({ _id: admin });
  const products=await Product.find({ restaurant_id: admin });
  res.json({
    resturant: resturant,
    products:products
  })
  
});

module.exports = {
  allResturant,
  register,
  findRestaurantByAdmin,
  restaurantDetails,
};
