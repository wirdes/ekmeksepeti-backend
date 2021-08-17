const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const add = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    type,
    price,
    cooking_time,
    protein,
    fat,
    carbohydrate,
    restaurant_id,
  } = req.body;

  if (req.files === null) {
    const product = await Product.create({
      name,
      description,
      type,
      price,
      cooking_time,
      protein,
      fat,
      carbohydrate,
      restaurant_id,
    });
    res.json(product);
    //starndart resimsiz
  } else {
    const file = req.files.file;

    file.mv(
      `${__dirname}/../public/uploads/${restaurant_id}-${file.name}`,
      asyncHandler(async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      })
    );
    const product = await Product.create({
      name,
      description,
      image: `/uploads/${restaurant_id}-${file.name}`,
      type,
      price,
      cooking_time,
      protein,
      fat,
      carbohydrate,
      restaurant_id,
    });
    res.json(product);
  }
});

const update = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
  });
});
const del = asyncHandler(async (req, res, next) => {
  const id = req.body.id || req.query.id;
  await Product.findByIdAndDelete(id);
  res.status(200).json({ success: true });
});

module.exports = {
  add,
  update,
  del,
};
