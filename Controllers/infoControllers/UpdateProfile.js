const user = require("../../Models/user.model");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../../Services/SendMailV");
const { updateSchema } = require("../../Models/validation.schema");
const resCodes = require("../../Constants/response.constants");

module.exports = {
  updateProfile: async (req, res, next) => {
    try {
      const result = updateSchema.validateAsync(req.body);
      await user.updateOne({ userId: req.body.userId }, req.body);

      return res.status(resCodes.SUCCESS).send("Successfully Updated");
    } catch (err) {
      next(err);
    }
  },
};
