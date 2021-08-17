const express = require("express");
const router = express.Router();
const {
  add,
  update,
  del,
  getProductByAdmin,
} = require("../controllers/product");
const { getAccessToRoute } = require("../middlewares/auth/admin");

router.post("/add", getAccessToRoute, add); //, getAccessToRoute
router.post("/update", update); // getAccessToRoute,
router.post("/delete/", getAccessToRoute, del); //getAccessToRoute,

module.exports = router;
