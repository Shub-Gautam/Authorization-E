const user = require("../../Models/user.model");
const {
  generateHashedPassword,
  isValidPassword,
} = require("../../Utils/bcrypt_helpers");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");
module.exports = {
  updatePass: async (req, res, next) => {
    try {
      const userId = req.payload.userId;

      const newPass = req.result.newPassword;

      const hashedPassword = await generateHashedPassword(newPass);

      const foundedUser = await user.findOne({ userId });
      const isValid = await isValidPassword(
        foundedUser.password,
        req.result.oldPassword
      );
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
