const router = require("express").Router();
const createError = require("http-errors");
const user = require("../Dao/UserSchema");
const sendMail = require("../Services/SendMailV");
const { authSchema, loginSchema } = require("../Helper/validation_schema");
const { signAccessToken } = require("../Helper/jwt_helpers");
const connectDB = require("../Dao/DBConnector");
const { v4: uuid4 } = require("uuid");

router.post("/register", async (req, res, next) => {
  try {
    const { regType, fName, lName, email, phoneNo, password, vMethod, uPhoto } =
      req.body;

    const result = await authSchema.validateAsync(req.body);

    connectDB();

    const doesExist = await user.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already registered`);

    const userId = uuid4();
    const uniqueString = `${uuid4()}u6648`;
    const vStatus = false;

    const newUser = new user({
      userId,
      regType,
      fName,
      lName,
      email,
      phoneNo,
      password,
      vMethod,
      vStatus,
      uPhoto,
      uniqueString,
    });

    const savedUser = await newUser.save(); //change it to newUser.create()
    sendMail(result.email, uniqueString);

    const accessToken = await signAccessToken(savedUser.id);

    res.status(200);
    res.send({ accessToken: accessToken, msg: "User registered successfully" });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
});

router.get("/verify/:uniqueString", async (req, res, next) => {
  try {
    const uStr = req.params.uniqueString;

    connectDB();

    const User = await user.findOne({ uniqueString: `${uStr}` });

    if (User) {
      await user.updateOne({ uniqueString: `${uStr}` }, { vStatus: true });

      res.status(200);
      res.send({ msg: "User verified successfully" });
    } else {
      res.status(422);
      res.send({ msg: "Something went wrong, user not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const User = await user.findOne({ Email: result.Email });

    if (!User) throw createError.NotFound("User Not Registered");

    const isMatch = await User.isValidPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(User.id);

    res.send({ accessToken });
  } catch (err) {
    if (err.isJoi === true)
      return next(createError.BadRequest("Invalid Username/Password"));
    next(err);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;
