const router = require("express").Router();

// Importing Middleware
const { verifyAccessToken } = require("../Utils/jwt_helpers");
const {
  checkJoiRegister,
} = require("../Middleware/JoiMiddleware/joi.register.check");
const {
  checkJoiLogin,
} = require("../Middleware/JoiMiddleware/joi.login.check");

// Importing Controllers
const { registerC } = require("../Controllers/authControllers/Register");
const { loginC } = require("../Controllers/authControllers/Login");
const { logoutC } = require("../Controllers/authControllers/Logout");
const { verifyC } = require("../Controllers/authControllers/Verify");
const { verifyOtp } = require("../Controllers/authControllers/VerifyOTP");
const { resendVerification } = require("../Controllers/authControllers/Resend");

// Routes
router.post("/register", checkJoiRegister, registerC);

router.get("/verify/:uniqueString", verifyC);

router.post("/verify-otp", verifyAccessToken, verifyOtp);

router.post("/login", checkJoiLogin, loginC);

router.post(
  "/login/resend-verification",
  verifyAccessToken,
  resendVerification
);

router.delete("/logout", verifyAccessToken, logoutC);

module.exports = router;
