const createError = require("http-errors");
const JWT = require("jsonwebtoken");

module.exports = {
  signAccessToken: (userId, email) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: userId,
        email: email,
      };
      const secret = process.env.JWT_SECRET_KEY;
      const option = {
        expiresIn: "24h",
      };
      JWT.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return next(createError.Unauthorized());
      }
      req.payload = payload;
      next();
    });
  },
};
