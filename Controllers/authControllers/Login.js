const { isValidPassword } = require("../../Utils/bcrypt_helpers");
const { loginSchema } = require("../../Models/validation.schema");
const user = require("../../Models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../../Utils/jwt_helpers");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  loginC: async (req, res, next) => {
    try {
      console.log("yu");

      const result = req.body;

      console.log("yee");
      let check = 0;
      result.email ? (check = 1) : (check = 2);
      console.log("yoo");

      const User = await user.findOne({
        $or: [({ email: result.email }, { phonNo: result.phonNo })],
      });

      if (!User) throw createError.NotFound("User Not Registered");

      if (check === 1) {
        // Login through email
        const isMatch = isValidPassword(result.password, User.password);

        if (!isMatch)
          throw createError.Unauthorized("Username/password not valid");

        const accessToken = await signAccessToken(User.id, User.email);

        res.status(resCodes.SUCCESS).send({ accessToken });
      } else if (check === 2) {
        // login through phone
        const isMatch = isValidPassword(result.password, User.password);

        if (!isMatch)
          throw createError.Unauthorized("Username/password not valid");

        const accessToken = await signAccessToken(User.id, User.phoneNo);

        res.status(resCodes.SUCCESS).send({ accessToken });
      }
    } catch (err) {
      if (err.isJoi === true)
        return next(createError.BadRequest("Invalid Username/Password"));
      next(err);
    }
  },
};
