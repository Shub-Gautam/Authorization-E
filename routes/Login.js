const router = require("express").Router();
const jwt = require("jsonwebtoken");

const connectDB = require("../Dao/DBConnector");
const user = require("../Dao/UserSchema");

router.get("/", async (req, res) => {
  const Email = req.body.Email;
  const Pass = req.body.password;

  // Validate User Here
  connectDB();

  let CurrentUser = await user.findOne({ Email: Email });

  if (CurrentUser.VStatus == false) {
    if (CurrentUser.password == Pass) {
      // Then generate JWT Token
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = CurrentUser;

      const token = jwt.sign(data, jwtSecretKey);
      res.status(200);
      res.json({
        loginStatus: "Successfull",
        token: token,
      });
    } else {
      res.status(201);
      res.json({ dat: " Account is verified but Password Not matched " });
    }
  } else {
    res.json(200);
    res.json({ dat: " You are not verified , Verify yourself first " });
  }
});

module.exports = router;
