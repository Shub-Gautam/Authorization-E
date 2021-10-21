const createError = require("http-errors");
const JWT = require("jsonwebtoken");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: userId,
      };
      const secret = process.env.JWT_SECRET_KEY;
      const option = {
        expiresIn: "1h",
        audience: userId,
      };
      JWT.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};
