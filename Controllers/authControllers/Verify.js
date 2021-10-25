const user = require("../../Models/user.model");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  verifyC: async (req, res, next) => {
    try {
      const uStr = req.params.uniqueString;

      const User = await user.findOne({ uniqueString: `${uStr}` });

      if (User) {
        await user.updateOne({ uniqueString: `${uStr}` }, { vStatus: true });

        res
          .status(resCodes.SUCCESS)
          .send({ msg: "User verified successfully" });
      } else {
        res
          .status(resCodes.NOT_ABLE_TO_PROCESS_DATA)
          .send({ msg: "Something went wrong, user not found" });
      }
    } catch (err) {
      next(err);
    }
  },
};
