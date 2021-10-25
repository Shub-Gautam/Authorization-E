const JWT = require("jsonwebtoken");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  logoutC: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.status(resCodes.SUCCESS).send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    });
  },
};
