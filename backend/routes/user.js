const express = require("express")
const router = express.Router()

// user controllers
const { loginUser, signupUser } = require("../controllers/userControllers")

// LOG IN route
router.post("/login", loginUser)

// SIGN UP route
router.post("/signup", signupUser)

module.exports = router