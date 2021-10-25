const connectDB = require("../../Dao/DBConnector");
const user = require("../../Models/user.model");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../../Services/SendMailV");
const { updateSchema } = require("../../Models/validation.schema");

module.exports = {
  updateProfile: async (req, res, next) => {
    try {
      const Updatetype = req.headers["updatetype"]; // 1 - Email , 2 - Phone , 3 - profile
      const email = req.payload.email;

      const result = await updateSchema.validateAsync(req.body);

      if (Updatetype === "1") {
        // Email Updatation and Reverification
        const uEmail = result.email;
        const uStr = uuid4();
        await user.updateOne(
          { email },
          { email: uEmail, vStatus: false, uniqueString: `${uStr}` }
        );
        sendMail(uEmail, uStr);
        res.status(200).send("Reverify your email");
      } else if (Updatetype === "2") {
        // Phone Updataion Reverification
      } else if (Updatetype === "3") {
        // Profile Updatation

        await user.updateOne({ email }, req.body);

        return res.status(200).send("Successfully Updated");
      } else {
        res.status(300).send("Please specify update type");
      }
    } catch (err) {
      next(err);
    }
  },
};
