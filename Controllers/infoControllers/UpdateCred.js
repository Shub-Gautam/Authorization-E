const { updateCredJoi } = require("../../Models/validation.schema");
const user = require("../../Models/user.model");
const { isValidPassword } = require("../../Utils/bcrypt_helpers");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");
const otpgn = require("../../Utils/otp_generator");
const otp = require("../../Models/optvalidation.model");
const fast2sms = require("fast-two-sms");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../../Services/SendMailV");

module.exports = {
  updateCred: async (req, res, next) => {
    try {
      let check = 0;
      req.result.email ? (check = 1) : (check = 2);

      const foundedUser = await user.findOne({ userId: req.payload.userId });

      const isValid = await isValidPassword(
        foundedUser.password,
        req.body.password
      );

      if (isValid) {
        return res
          .status(resCodes.INCOMPLETE_INFO)
          .send(resMsg.INVALID_CREDENTIALS);
      }

      if (check === 1) {
        // email path

        const eUser = await user.findOne({
          email: req.result.email,
          vStatus: false,
        });
        if (eUser) {
          await user.deleteOne({ email: req.result.email, vStatus: false });
        }

        const uStr = uuid4();
        await user.updateOne(
          { email: foundedUser.email },
          { email: req.result.email, uniqueString: `${uStr}`, vStatus: false }
        );
        sendMail(foundedUser.email, uStr);
        res.status(resCodes.SUCCESS).send(resMsg.REVERIFY);
      } else if (check === 2) {
        // phone path

        const eUser = await user.findOne({
          phoneNo: req.result.phoneNo,
          vStatus: false,
        });
        if (eUser) {
          await user.deleteOne({ phoneNo: req.result.phoneNo, vStatus: false });
        }

        const OTP = otpgn.otpGenerator();

        const newOtp = await otp.findOneAndDelete({
          userId: req.payload.userId,
        });

        const newOtpData = new otp({
          userId: req.payload.userId,
          phoneNo: newOtp.phoneNo,
          otp: OTP,
        });
        await newOtpData.save();

        const options = {
          authorization: process.env.API_KEY,
          message: `You OTP for verification is ${OTP}`,
          numbers: [`${req.result.phoneNo}`],
        };

        fast2sms.sendMessage(options);

        res.status(resCodes.SUCCESS).send(resMsg.REVERIFY);
      }
    } catch (err) {
      next(err);
    }
  },
};
