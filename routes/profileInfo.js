const router = require("express").Router();

// Importing middleware
const { verifyAccessToken } = require("../Utils/jwt_helpers");
const { checkVerification } = require("../Utils/verification_checker");
const {
  checkJoiUpdateProfile,
} = require("../Middleware/JoiMiddleware/joi.update.profile.check");
const {
  checkJoiUpdateCred,
} = require("../Middleware/JoiMiddleware/joi.update.cred.check");
const {
  checkJoiUpdatePassword,
} = require("../Middleware/JoiMiddleware/joi.update.password.check");

// Importing Controllers
const { userProfile } = require("../Controllers/infoControllers/Profile");
const {
  updateProfile,
} = require("../Controllers/infoControllers/UpdateProfile");
const { updatePass } = require("../Controllers/infoControllers/updatePassword");
const { updateCred } = require("../Controllers/infoControllers/UpdateCred");

// Routes
router.get("/", verifyAccessToken, checkVerification, userProfile);

router.post(
  "/update",
  checkJoiUpdateProfile,
  verifyAccessToken,
  checkVerification,
  updateProfile
);

router.post(
  "/update-pass",
  checkJoiUpdatePassword,
  verifyAccessToken,
  checkVerification,
  updatePass
);

router.post(
  "/update-cred",
  checkJoiUpdateCred,
  verifyAccessToken,
  checkVerification,
  updateCred
);

module.exports = router;
