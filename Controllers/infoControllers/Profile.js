const connectDB = require("../Dao/DBConnector");
const user = require("../Dao/UserSchema");

module.exports = {
  userProfile: async (req, res, next) => {
    try {
      let email = req.body.email;

      connectDB();
      const currentUser = await user.findOne({ email: email });

      res.status(200);
      res.send(currentUser);
    } catch (err) {
      next(err);
    }
  },
};
