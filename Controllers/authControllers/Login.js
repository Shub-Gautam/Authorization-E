const { isValidPassword } = require("../../Utils/bcrypt_helpers");
const { loginSchema } = require("../../Models/validation.schema");
const user = require("../../Models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../../Utils/jwt_helpers");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");

module.exports = {
  loginC: async (req, res, next) => {
    try {
      // Joi Validation
      const result = await loginSchema.validateAsync(req.body);

      let check = 0;
      result.email ? (check = 1) : (check = 2);

      if (check === 1) {
        // Login through email
        const User = await user.findOne({ email: result.email });
        if (!User) throw createError.NotFound(resMsg.USER_NOT_REGISTERED);

        const isMatch = isValidPassword(result.password, User.password);
        if (!isMatch)
          throw createError.Unauthorized(resMsg.INVALID_CREDENTIALS);

        const accessToken = await signAccessToken(User.userId, User.email);
        res.status(resCodes.SUCCESS).send({ accessToken });
      } else if (check === 2) {
        // login through phone

        const User = await user.findOne({ phoneNo: result.phoneNo });
        if (!User) throw createError.NotFound(resMsg.USER_NOT_REGISTERED);

        const isMatch = isValidPassword(result.password, User.password);
        if (!isMatch)
          throw createError.Unauthorized(resMsg.INVALID_CREDENTIALS);

        const accessToken = await signAccessToken(User.userId, User.phoneNo);
        res.status(resCodes.SUCCESS).send({ accessToken });
      }
    } catch (err) {
      if (err.isJoi === true)
        return next(createError.BadRequest(resMsg.INVALID_CREDENTIALS));
      next(err);
    }
  },
};
