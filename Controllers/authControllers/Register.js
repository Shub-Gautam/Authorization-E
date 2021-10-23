const connectDB = require("../../Dao/DBConnector");
const { isValidPassword } = require("../../Helper/bcrypt_helpers");
const { authSchema } = require("../../Models/validation_schema");
const user = require("../../Models/UserSchema");
const createError = require("http-errors");
const { signAccessToken } = require("../../Helper/jwt_helpers");
const sendMail = require("../../Services/SendMailV");
const { v4: uuid4 } = require("uuid");

module.exports = {
  registerC: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      connectDB();

      const doesExist = await user.findOne({ email: result.email });
      if (doesExist)
        throw createError.Conflict(`${result.email} is already registered`);

      req.userId = uuid4();
      req.uniqueString = `${uuid4()}u6648`;

      const newUser = new user(req.body);

      const savedUser = await newUser.save(); //change it to newUser.create()
      sendMail(result.email, uniqueString);

      const accessToken = await signAccessToken(savedUser.id);

      res.status(200).send({
        accessToken: accessToken,
        msg: "User registered successfully",
      });
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
};
