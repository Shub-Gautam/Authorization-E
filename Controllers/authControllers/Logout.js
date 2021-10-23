const JWT = require("jsonwebtoken");

module.exports = {
  logoutC: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.status(200).send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    });
  },
};
