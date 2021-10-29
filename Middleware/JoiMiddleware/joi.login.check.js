const { loginSchema } = require("../../Models/validation.schema");

module.exports = {
  checkJoiLogin: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      req.result = result;
      next();
    } catch (err) {
      next(err);
    }
  },
};
