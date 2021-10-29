const { updateCredJoi } = require("../../Models/validation.schema");

module.exports = {
  checkJoiUpdateCred: async (req, res, next) => {
    try {
      const result = await updateCredJoi.validateAsync(req.body);
      req.result = result;
      next();
    } catch (err) {
      next(err);
    }
  },
};
