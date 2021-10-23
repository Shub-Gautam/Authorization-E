const router = require("express").Router();

// Importing middleware
const { verifyAccessToken } = require("../Helper/jwt_helpers");

// Importing Controllers
const { userProfile } = require("../Controllers/infoControllers/Profile");
const {
  updateProfile,
} = require("../Controllers/infoControllers/UpdateProfile");

// Routes
router.get("/", verifyAccessToken, userProfile);

router.post("/update", verifyAccessToken, updateProfile);

module.exports = router;
