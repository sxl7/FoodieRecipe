const express = require("express");
const router = express.Router();
const userController  = require('../controller/userController');

router.post("/register",userController.uRegister)
router.post("/login",userController.uLogin)

module.exports = router;