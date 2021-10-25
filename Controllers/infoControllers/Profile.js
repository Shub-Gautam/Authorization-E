const connectDB = require("../../Dao/DBConnector");
const user = require("../../Models/user.model");

module.exports = {
  userProfile: async (req, res, next) => {
    try {
      const payloadObj = req.payload;

      const currentUser = await user.findOne({ email: payloadObj.email });

      res.status(200);
      res.send(currentUser);
    } catch (err) {
      next(err);
    }
  },
};
