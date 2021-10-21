const router = require("express").Router();
const sendMail = require("../Services/SendMailV");
const user = require("../Dao/UserSchema");
const connectDB = require("../Dao/DBConnector");
const { v4: uuid4 } = require("uuid");

router.post("/", async (req, res) => {
  connectDB();

  const UserID = uuid4();
  const RegType = req.body.RegType;
  const FName = req.body.FName;
  const LName = req.body.LName;
  const Email = req.body.Email;
  const PhoneNo = req.body.PhoneNo;
  const password = req.body.password;
  const VMethod = req.body.VMethod;
  const UPhoto = req.body.UPhoto;
  const UCreated = new Date();
  const uniqueString = `${uuid4()}u6648`;
  const VStatus = false;

  const newUser = new user({
    UserID,
    RegType,
    FName,
    LName,
    Email,
    PhoneNo,
    password,
    VMethod,
    VStatus,
    UPhoto,
    UCreated,
    uniqueString,
  });

  await newUser.save();
  sendMail(Email, uniqueString);

  res.status(200);
  res.json("User Registered Successfully");
});

module.exports = router;
