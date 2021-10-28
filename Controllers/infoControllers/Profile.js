const user = require("../../Models/user.model");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");

module.exports = {
  userProfile: async (req, res, next) => {
    try {
      let foundedUser = user.find({ userId: req.payload.userId });
      res
        .status(resCodes.SUCCESS)
        .send({ fName: foundedUser.fName, lName: foundedUser.lName });
    } catch (err) {
      next(err);
    }
  },
};
