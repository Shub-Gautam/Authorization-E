const router = require("express").Router();

// Importing middleware
const { verifyAccessToken } = require("../Utils/jwt_helpers");
const { checkVerification } = require("../Utils/verification_checker");

// Importing Controllers
const { userProfile } = require("../Controllers/infoControllers/Profile");
const {
  updateProfile,
} = require("../Controllers/infoControllers/UpdateProfile");
const { updatePass } = require("../Controllers/infoControllers/updatePassword");
const { updateCred } = require("../Controllers/infoControllers/UpdateCred");

// Routes
router.get("/", verifyAccessToken, checkVerification, userProfile);

router.post("/update", verifyAccessToken, checkVerification, updateProfile);

router.post("/update-pass", verifyAccessToken, checkVerification, updatePass);

router.post("/update-cred", verifyAccessToken, checkVerification, updateCred);

module.exports = router;
