const express = require("express");
const router = express.Router();
const userController  = require('../controller/userRegisterController');

router.post("/register",userController.uRegister)

module.exports = router;