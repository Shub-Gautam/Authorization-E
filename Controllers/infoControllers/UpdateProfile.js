const connectDB = require("../../Dao/DBConnector");
const user = require("../../Models/user.model");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../../Services/SendMailV");

module.exports = {
  updateProfile: async (req, res, next) => {
    try {
      console.log("we entered");
      const Updatetype = req.headers["updatetype"]; // 1 - Email , 2 - Phone , 3 - profile
      const email = req.body.email;

      console.log(Updatetype);

      if (Updatetype === "1") {
        // Email Updatation and Reverification
        const uEmail = req.body.uEmail;
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
        console.log("here");
        console.log(email);
        connectDB();
        const User = await user.updateOne({ email }, req.body);
        console.log(User);
        return res.status(200).send("Successfully Updated");
      } else {
        res.status(300).send("Please specify update type");
      }
    } catch (err) {
      next(err);
    }
  },
};
