const user = require("../Models/user.model");
const resCodes = require("../Constants/response.constants");

module.exports = {
  checkVerification: (req, res, next) => {
    const foundedUser = user.find({ userId: req.payload.userId });

    if (!foundedUser.vStatus) {
      return res
        .status(resCodes.NOT_ABLE_TO_PROCESS_DATA)
        .send({ msg: resMsg.NOT_VERIFIED_USER });
    }
    next();
  },
};
