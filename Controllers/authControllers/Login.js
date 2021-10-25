const connectDB = require("../../Dao/DBConnector");
const { isValidPassword } = require("../../Helper/bcrypt_helpers");
const { loginSchema } = require("../../Models/validation.schema");
const user = require("../../Models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../../Helper/jwt_helpers");

module.exports = {
  loginC: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      const User = await user.findOne({ email: result.email });

      if (!User) throw createError.NotFound("User Not Registered");

      const isMatch = isValidPassword(result.password, User.password);

      if (!isMatch)
        throw createError.Unauthorized("Username/password not valid");

      const accessToken = await signAccessToken(User.id, User.email);

      res.send({ accessToken });
    } catch (err) {
      if (err.isJoi === true)
        return next(createError.BadRequest("Invalid Username/Password"));
      next(err);
    }
  },
};
