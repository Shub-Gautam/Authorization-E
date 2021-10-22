const router = require("express").Router();
const JWT = require("jsonwebtoken");
const { verifyAccessToken } = require("../Helper/jwt_helpers");
const connectDB = require("../Dao/DBConnector");
const createError = require("http-errors");
const user = require("../Dao/UserSchema");

router.get("/", verifyAccessToken, async (req, res, next) => {
  try {
    let email = req.body.email;

    connectDB();
    const currentUser = await user.findOne({ email: email });

    res.status(200);
    res.send(currentUser);
  } catch (err) {
    next(err);
  }
});

router.post("/update", async (req, res, next) => {});

module.exports = router;
