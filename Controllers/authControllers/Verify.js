const connectDB = require("../../Dao/DBConnector");
const user = require("../../Models/user.model");

module.exports = {
  verifyC: async (req, res, next) => {
    try {
      const uStr = req.params.uniqueString;

      const User = await user.findOne({ uniqueString: `${uStr}` });

      if (User) {
        await user.updateOne({ uniqueString: `${uStr}` }, { vStatus: true });

        res.status(200).send({ msg: "User verified successfully" });
      } else {
        res.status(422).send({ msg: "Something went wrong, user not found" });
      }
    } catch (err) {
      next(err);
    }
  },
};
