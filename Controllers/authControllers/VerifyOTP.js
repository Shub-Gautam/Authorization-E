const otp = require("../../Models/optvalidation.model");
const user = require("../../Models/user.model");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  verifyOtp: async (req, res, next) => {
    try {
      const phoneno = req.body.phoneNo;
      const OTP = req.body.otp;
      const User = await otp.findOne({ phoneNo: phoneno });

      if (User) {
        const otpdata = await otp.findOne({ otp: OTP });

        if (otpdata) {
          await user.updateOne({ phoneNo: phoneno }, { vStatus: true });
          res
            .status(resCodes.SUCCESS)
            .send({ msg: "User verified successfully" });
        } else {
          res
            .status(resCodes.NOT_ABLE_TO_PROCESS_DATA)
            .send({ msg: "invalid otp" });
        }
      } else {
        res
          .status(resCodes.NOT_ABLE_TO_PROCESS_DATA)
          .send({ msg: "OTP Expired" });
      }
    } catch (err) {
      next(err);
    }
  },
};
