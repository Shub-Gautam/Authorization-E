const router = require("express").Router();
const createError = require("http-errors");
const user = require("../Dao/UserSchema");
const { authSchema, loginSchema } = require("../Helper/validation_schema");
const { signAccessToken } = require("../Helper/jwt_helpers");

router.post("/register", async (req, res, next) => {
  try {
    const { RegType, FName, LName, Email, PhoneNo, password, VMethod, UPhoto } =
      req.body;

    // if (!Email || !password) throw createError.BadRequest();
    const result = await authSchema.validateAsync(req.body);

    connectDB();

    const doesExist = await user.findOne({ Email: result.Email });
    if (doesExist)
      throw createError.Conflict(`${result.Email} is already registered`);

    const UserID = uuid4();
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

    const savedUser = await newUser.save();
    sendMail(Email, uniqueString);

    const accessToken = await signAccessToken(savedUser.id);

    res.status(200);
    res.json("User Registered Successfully");
    res.send(accessToken);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
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
