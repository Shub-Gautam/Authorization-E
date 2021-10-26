const user = require("../../Models/user.model");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  userProfile: async (req, res, next) => {
    try {
      let currentUser;

      if (isNaN(req.payload.userName)) {
        currentUser = await user.findOne({ email: req.payload.userName });
      } else {
        currentUser = await user.findOne({
          phoneNo: req.payload.userName,
        });
      }

      res.status(resCodes.SUCCESS);
      res.send(currentUser);
    } catch (err) {
      next(err);
    }
  },
};
