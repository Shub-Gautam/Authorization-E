const user = require("../../Models/user.model");
const {
  generateHashedPassword,
  isValidPassword,
} = require("../../Utils/bcrypt_helpers");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");
const { updateCredJoi } = require("../../Models/validation.schema");
module.exports = {
  updatePass: async (req, res, next) => {
    try {
      const result = updateCredJoi.validateAsync(req.body);

      const userId = req.payload.userId;

      const newPass = result.newPassword;

      const hashedPassword = generateHashedPassword(newPass);

      const foundedUser = user.find({ userId });
      const isValid = isValidPassword(foundedUser.password, result.oldPassword);
      if (!isValid) {
        return res
          .status(resCodes.INCOMPLETE_INFO)
          .send(resMsg.INVALID_CREDENTIALS);
      }

      await user.updateOne({ userId }, { password: hashedPassword });

      res.status(resCodes.SUCCESS).send(resMsg.UPDATE_SUCCESSFULL);
    } catch (err) {
      next(err);
    }
  },
};
