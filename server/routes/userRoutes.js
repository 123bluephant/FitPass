const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// User registration
router.post("/signup", userController.register);

// User login
router.post("/login", userController.login);

//google auth
router.post('/google',userController.googleAuth);

module.exports = router;