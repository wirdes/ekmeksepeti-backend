const asyncHandler = require("express-async-handler");
const Orders = require("../models/Orders");
const Product = require("../models/Product");

const add = asyncHandler(async (req, res, next) => {
  const { orderElements, userId, address, total } = req.body;
  let orders = [];
  for (let i = 0; i < orderElements.length; i++) {
    const product = await Product.findById(orderElements[i]._id);
    orders.push({ product, quantity: orderElements[i].quantity });
  }
  const product = await Orders.create({
    orderElements: orders,
    userId,
    address,
    total,
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
  const order = await Orders.find({ userId: id });
  res.status(200).json({ success: true, data: order });
});

module.exports = {
  add,
  get,
  getByUser,
};
