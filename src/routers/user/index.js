const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

// login

router.post("/login", userController.userLogin);
module.exports = router;
