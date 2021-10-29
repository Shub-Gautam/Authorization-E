const { updatePassJoi } = require("../../Models/validation.schema");

module.exports = {
  checkJoiUpdatePassword: async (req, res, next) => {
    try {
      const result = await updatePassJoi.validateAsync(req.body);
      req.result = result;
      next();
    } catch (err) {
      next(err);
    }
  },
};
