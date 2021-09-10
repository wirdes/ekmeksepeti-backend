const asyncHandler = require("express-async-handler");
const Orders = require("../models/Orders");

const add = asyncHandler(async (req, res, next) => {
  const { orderElements, userId } = req.body;
  const product = await Orders.create({
    orderElements,
    userId,
    orderTime: new Date().toLocaleString(),
  });
  res.json(product);
});

const get = asyncHandler(async (req, res, next) => {
  const id = req.body.id || req.query.id;
  const order = await Orders.findById(id);
  res.status(200).json({ success: true, data: order });
});
const getByUser = asyncHandler(async (req, res, next) => {
  const id = req.body.id || req.query.id;
  const order = await Resturant.find({ userId: id });
  res.status(200).json({ success: true, data: order });
});

module.exports = {
  add,
  get,
  getByUser,
};
