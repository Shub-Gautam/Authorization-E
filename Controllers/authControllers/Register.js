const { authSchema } = require("../../Models/validation.schema");
const user = require("../../Models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../../Utils/jwt_helpers");
const sendMail = require("../../Services/SendMailV");
const { v4: uuid4 } = require("uuid");
const resCodes = require("../../Constants/response.constants");
const fast2sms = require("fast-two-sms");
const otpgn = require("../../Utils/otp_generator");
const otpVal = require("../../Models/optvalidation.model");
const { generateHashedPassword } = require("../../Utils/bcrypt_helpers");
const resMsg = require("../../Constants/response.messages");

module.exports = {
  registerC: async (req, res, next) => {
    try {
      // Check if User is registering through email or with phoneNo
      let check = 0;
      req.result.email ? (check = 1) : (check = 2);

      // Hashing the password
      const hashedPass = await generateHashedPassword(req.result.password);
      req.body.password = hashedPass;

      if (check === 1) {
        // Follow email path

        let doesExist = await user.findOne({
          email: req.result.email,
          vStatus: false,
        });
        if (doesExist) throw createError.Conflict(`User is already registered`);

        req.body.userId = uuid4();
        req.body.uniqueString = `${uuid4()}u6648`;

        const newUser = new user(req.body);
        const savedUser = await newUser.save();

        sendMail(req.result.email, req.body.uniqueString);
        const accessToken = await signAccessToken(
          savedUser.userId,
          savedUser.email
        );

        res.status(resCodes.SUCCESS).send({
          accessToken: accessToken,
          msg: "User registered successfully",
        });
      } else if (check === 2) {
        // Follow phone path

        let doesExist = await user.findOne({
          phoneNo: req.result.phoneNo,
          vStatus: false,
        });
        if (doesExist) throw createError.Conflict(`User is already registered`);

        const OTP = otpgn.otpGenerator();
        req.body.userId = uuid4();

        const newUser = new user(req.body);
        const savedUser = await newUser.save();

        const savedOtp = new otpVal({
          userId: savedUser.userId,
          phoneNo: req.result.phoneNo,
          otp: OTP,
        });

        await savedOtp.save();

        const options = {
          authorization: process.env.API_KEY,
          message: `You OTP for verification is ${OTP}`,
          numbers: [`${req.result.phoneNo}`],
        };

        fast2sms.sendMessage(options);

        const accessToken = await signAccessToken(
          savedUser.userId,
          savedUser.phoneNo
        );

        res.status(resCodes.SUCCESS).send({
          accessToken: accessToken,
          msg: "User registered successfully",
        });
      }
    } catch (err) {
      if (err.isJoi === true) err.status = resCodes.NOT_ABLE_TO_PROCESS_DATA;
      next(err);
    }
  },
};
