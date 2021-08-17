const express = require("express");
const router = express.Router();
const { register, login, tokenVerify } = require("../controllers/admin");


router.post("/register", register);
router.post("/login", login);
router.get("/tokenVerify/", tokenVerify);

module.exports = router;
