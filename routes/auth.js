const router = require("express").Router();

// Importing Middleware
const { verifyAccessToken } = require("../Utils/jwt_helpers");

// Importing Controllers
const { registerC } = require("../Controllers/authControllers/Register");
const { loginC } = require("../Controllers/authControllers/Login");
const { logoutC } = require("../Controllers/authControllers/Logout");
const { verifyC } = require("../Controllers/authControllers/Verify");
const { verifyOtp } = require("../Controllers/authControllers/VerifyOTP");

// Routes
router.post("/register", registerC);

router.get("/verify/:uniqueString", verifyC);

router.post("/verify-otp", verifyOtp);

router.post("/login", loginC);

router.delete("/logout", verifyAccessToken, logoutC);

module.exports = router;
