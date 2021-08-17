const express = require("express");
const router = express.Router();
const {
  allResturant,
  register,
  restaurantDetails,
  findRestaurantByAdmin,
  allResAndPro,
} = require("../controllers/resturant");

router.get("/restaurantDetails", restaurantDetails);
router.get("/findRestaurantByAdmin", findRestaurantByAdmin);
router.get("/allResturant", allResturant);
router.post("/register", register);

module.exports = router;
