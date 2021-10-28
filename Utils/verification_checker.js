const user = require("../Models/user.model");
const resCodes = require("../Constants/response.constants");
const resMsg = require("../Constants/response.messages");

module.exports = {
  checkVerification: async (req, res, next) => {
    console.log(req.payload.userId);
    const foundedUser = await user.findOne({ userId: req.payload.userId });
    console.log(foundedUser);

    if (foundedUser.vStatus === false) {
      return res
        .status(resCodes.NOT_ABLE_TO_PROCESS_DATA)
        .send({ msg: resMsg.NOT_VERIFIED_USER });
    }
    next();
  },
};
