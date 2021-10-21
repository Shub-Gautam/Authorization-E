const router = require("express").Router();
const connectDB = require("../Dao/DBConnector");
const user = require("../Dao/UserSchema");

router.get("/", async (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let Email = req.body.Email;
  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      connectDB();
      const CurrentUser = await user.find({ Email: Email }).limit(1);
      res.status(200);
      res.json(CurrentUser);
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});

module.exports = router;
