const express = require("express");
const router = express.Router();
const { add, update, del } = require("../controllers/product");
//const { getAccessToRoute } = require("../middlewares/auth/admin");

router.post("/add", add); //, getAccessToRoute
router.post("/update", update); // getAccessToRoute,
router.post("/delete/", del); //getAccessToRoute,

module.exports = router;
