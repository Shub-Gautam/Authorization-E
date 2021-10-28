const otp = require("../../Models/optvalidation.model");
const user = require("../../Models/user.model");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");

module.exports = {
  verifyOtp: async (req, res, next) => {
    try {
      const userId = req.payload.userId;
      const foundedUser = await user.findOne({ userId });
      const foundedOtp = await otp.findOne({ userId });

      console.log(foundedUser);

      if (foundedOtp) {
        console.log(userId);
        console.log(foundedOtp);
        console.log(foundedUser);
        if (foundedUser) {
          if (foundedOtp.otp === req.body.otp) {
            await user.updateOne({ userId }, { vStatus: true });
            res.status(resCodes.SUCCESS).send(resMsg.VERIFIED_SUCCESSFULLY);
          } else {
            res
              .status(resCodes.NOT_ABLE_TO_PROCESS_DATA)
              .send(resMsg.INVALID_OTP);
          }
        }
      } else {
        res.status(resCodes.NOT_ABLE_TO_PROCESS_DATA).send(resMsg.OTP_EXPIRED);
      }
    } catch (err) {
      next(err);
    }
  },
};
