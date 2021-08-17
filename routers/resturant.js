const express = require("express");
const router = express.Router();
const {
  register,
  findRestaurantByCityPlateNumber,
  restaurantDetails,
} = require("../controllers/resturant");

router.get("/restaurantDetails", restaurantDetails);
router.get("/findRestaurantByCityPlateNumber", findRestaurantByCityPlateNumber);
router.post("/register", register);

module.exports = router;
