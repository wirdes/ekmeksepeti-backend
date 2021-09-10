const express = require("express");
const router = express.Router();
const { add, get,getByUser } = require("../controllers/orders");

router.post("/add", add);
router.get("/get", get);
router.get("/getByUser", get);

module.exports = router;
