const express = require("express");
const router = express.Router();
const admin = require("./admin");
const resturant = require("./resturant");
const product = require("./product");



router.use("/resturant", resturant);
router.use("/admin", admin);
router.use("/product", product);

module.exports = router;
