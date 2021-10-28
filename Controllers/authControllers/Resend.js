const user = require("../../Models/user.model");
const otp = require("../../Models/optvalidation.model");
const resMsg = require("../../Constants/response.messages");
const otpgn = require("../../Utils/otp_generator");

module.exports = {
  resendVerification: async (req, res, next) => {
    const userId = req.payload.userId;

    const foundedUser = user.find({ userId });

    let check = 0;
    foundedUser.email ? (check = 1) : (check = 2);

    if (check === 1) {
      // Email path
      const uStr = uuid4();
      await user.updateOne(
        { email: foundedUser.email },
        { uniqueString: `${uStr}` }
      );
      sendMail(foundedUser.email, uStr);
      res.status(resCodes.SUCCESS).send(resMsg.REVERIFY);
      //
    } else if (check === 2) {
      // Phone path

      const OTP = otpgn.otpGenerator();

      const foundedOtp = otp.find(userId);

      if (foundedOtp) {
        await otp.deleteOne(userId);
        await otp.save({ userId, phoneNo: foundedOtp.phoneNo, otp: OTP });
      }

      const options = {
        authorization: process.env.API_KEY,
        message: `You OTP for verification is ${OTP}`,
        numbers: [`${result.phoneNo}`],
      };

      fast2sms.sendMessage(options);

      res.status(resCodes.SUCCESS).send(resMsg.REVERIFY);
    }
  },
};
