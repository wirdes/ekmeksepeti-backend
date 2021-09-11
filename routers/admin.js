const express = require("express");
const router = express.Router();
const {
  register,
  login,
  tokenVerify,
  addAddress,
  updateProfile
} = require("../controllers/admin");

router.post("/register", register);
router.post("/login", login);
router.post("/addAddress", addAddress);
router.get("/tokenVerify/", tokenVerify);
router.post("/updateProfile/", updateProfile);

module.exports = router;
