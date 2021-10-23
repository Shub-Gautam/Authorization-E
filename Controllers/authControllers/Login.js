const connectDB = require("../../Dao/DBConnector");
const { isValidPassword } = require("../../Helper/bcrypt_helpers");
const { loginSchema } = require("../../Models/validation_schema");
const user = require("../../Models/UserSchema");
const createError = require("http-errors");
const { signAccessToken } = require("../../Helper/jwt_helpers");

module.exports = {
  loginC: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      connectDB();
      const User = await user.findOne({ email: result.email });

      if (!User) throw createError.NotFound("User Not Registered");

      const isMatch = isValidPassword(result.password, User.password);

      if (!isMatch)
        throw createError.Unauthorized("Username/password not valid");

      const accessToken = await signAccessToken(User.id);

      res.send({ accessToken });
    } catch (err) {
      if (err.isJoi === true)
        return next(createError.BadRequest("Invalid Username/Password"));
      next(err);
    }
  },
};
