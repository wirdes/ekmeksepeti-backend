const express = require("express");
const router = express.Router();
const admin = require("./admin");
const resturant = require("./resturant");
const product = require("./product");
const orders = require("./orders");

router.use("/resturant", resturant);
router.use("/admin", admin);
router.use("/product", product);
router.use("/orders", orders);

module.exports = router;
