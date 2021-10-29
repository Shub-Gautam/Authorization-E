const { authSchema } = require("../../Models/validation.schema");

module.exports = {
  checkJoiRegister: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      req.result = result;
      next();
    } catch (err) {
      next(err);
    }
  },
};
