const user = require("../../Models/user.model");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../../Services/SendMailV");
const { updateSchema } = require("../../Models/validation.schema");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  updateProfile: async (req, res, next) => {
    try {
      const Updatetype = req.headers["updatetype"]; // 1 - Email , 2 - Phone , 3 - profile
      const username = req.payload.userName;

      const result = req.body;

      if (Updatetype === "1") {
        // Email Updatation and Reverification
        const uEmail = username;
        const uStr = uuid4();
        await user.updateOne(
          { email },
          { email: uEmail, vStatus: false, uniqueString: `${uStr}` }
        );
        sendMail(uEmail, uStr);
        res.status(resCodes.SUCCESS).send("Reverify your email");
      } else if (Updatetype === "2") {
        // Phone Updataion Reverification
      } else if (Updatetype === "3") {
        // Profile Updatation

        if (username == new Number("2"))
          await user.updateOne({ phoneNo: username }, req.body);
        else await user.updateOne({ email: userName }, req.body);

        return res.status(resCodes.SUCCESS).send("Successfully Updated");
      } else {
        res.status(resCodes.INCOMPLETE_INFO).send("Please specify update type");
      }
    } catch (err) {
      next(err);
    }
  },
};
