const router = require("express").Router();
const connectDB = require("../Dao/DBConnector");
const user = require("../Dao/UserSchema");

router.get("/", (req, res) => {
  const Email = req.body.Email;
  const Pass = req.body.password;

  connectDB();
  // console.log(Email);

  const CurrentUser = user.find({ Email: Email }).limit(1);

  console.log(CurrentUser.VStatus);
  console.log(CurrentUser.password);
  if (CurrentUser.VStatus == true) {
    if (CurrentUser.password == Pass) {
      res.json(CurrentUser);
    } else {
      res.json({ dat: " Account is verified but Password Not matched " });
    }
  } else {
    res.json({ dat: " You are not verified , Verify yourself first " });
  }
});

module.exports = router;
