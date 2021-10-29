const { updateSchema } = require("../../Models/validation.schema");

module.exports = {
  checkJoiUpdateProfile: async (req, res, next) => {
    try {
      const result = await updateSchema.validateAsync(req.body);
      req.result = result;
      next();
    } catch (err) {
      next(err);
    }
  },
};
