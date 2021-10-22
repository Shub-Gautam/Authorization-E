const router = require("express").Router();
const connectDB = require("../Dao/DBConnector");
const user = require("../Dao/UserSchema");

router.get("/:uniqueString", async (req, res) => {
  const uStr = req.params.uniqueString;

  connectDB();

  const User = await user.findOne({ uniqueString: `${uStr}` });

  if (User) {
    User.vStatus = true;
    await User.save();
    res.status(200);
    res.json("verified");
  } else {
    res.json("Something went Wrong User not found");
  }
});

module.exports = router;
