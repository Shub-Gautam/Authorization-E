const user = require("../../Models/user.model");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  userProfile: async (req, res, next) => {
    try {
      const payloadObj = req.payload;

      const currentUser = await user.findOne({ email: payloadObj.email });

      res.status(resCodes.SUCCESS);
      res.send(currentUser);
    } catch (err) {
      next(err);
    }
  },
};
