const express = require("express");
const router = express.Router();
const { register, login, tokenVerify , loguot} = require("../controllers/admin");


router.post("/register", register);
router.post("/login", login);
router.get("/tokenVerify/", tokenVerify);
//router.post("/loguot/", loguot);

module.exports = router;
