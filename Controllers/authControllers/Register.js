const connectDB = require("../../Dao/DBConnector");
const { authSchema } = require("../../Models/validation.schema");
const user = require("../../Models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../../Helper/jwt_helpers");
const sendMail = require("../../Services/SendMailV");
const { v4: uuid4 } = require("uuid");
const resCodes = require("../../Constants/response.constants");
const fast2sms = require("fast-two-sms");
const otpgn = require("../../Helper/otp_generator");

module.exports = {
  registerC: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      // Check if User is registering through email or with phoneNo
      const check = 0;
      result.email ? (check = 1) : (check = 2);

      if (check === 1) {
        // Follow email path
        const doesExist = await user.findOne({ email: result.email });

        if (doesExist)
          throw createError.Conflict(`${result.email} is already registered`);

        req.body.userId = uuid4();
        req.body.uniqueString = `${uuid4()}u6648`;

        const newUser = new user(req.body);

        const savedUser = await newUser.save();

        sendMail(result.email, req.body.uniqueString);
        const accessToken = await signAccessToken(
          savedUser.id,
          savedUser.email
        );

        res.status(200).send({
          accessToken: accessToken,
          msg: "User registered successfully",
        });
      } else if (check === 2) {
        // Follow phone path

        const doesExist = await user.findOne({ email: result.email });

        if (doesExist)
          throw createError.Conflict(`${result.phoneNo} is already registered`);

        const OTP = otpgn.otpGenerator();

        req.body.userId = uuid4();
        req.body.otp = OTP;

        const newUser = new user(req.body);

        const savedUser = await newUser.save();

        const options = {
          authorization: process.env.API_KEY,
          message: `You OTP for verification is ${OTP}`,
          numbers: [`${result.phoneNo}`],
        };

        fast2sms.sendMessage(options);

        const accessToken = await signAccessToken(
          savedUser.id,
          savedUser.phoneNo
        );

      res.status(resCodes.SUCCESS).send({
        accessToken: accessToken,
        msg: "User registered successfully",
      });
    } catch (err) {
      if (err.isJoi === true) err.status = resCodes.NOT_ABLE_TO_PROCESS_DATA;
      next(err);
    }
  },
};
