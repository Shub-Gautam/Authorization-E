const connectDB = require("../../Dao/DBConnector");
const { authSchema } = require("../../Models/validation.schema");
const user = require("../../Models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../../Helper/jwt_helpers");
const sendMail = require("../../Services/SendMailV");
const { v4: uuid4 } = require("uuid");

module.exports = {
  registerC: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      const doesExist = await user.findOne({ email: result.email });
      if (doesExist)
        throw createError.Conflict(`${result.email} is already registered`);

      req.body.userId = uuid4();
      console.log("we are here");
      req.body.uniqueString = `${uuid4()}u6648`;

      const newUser = new user(req.body);

      const savedUser = await newUser.save(); //change it to newUser.create()
      console.log("we are herer again");
      sendMail(result.email, req.body.uniqueString);
      const accessToken = await signAccessToken(savedUser.id, savedUser.email);
      console.log("hety");
      res.status(200).send({
        accessToken: accessToken,
        msg: "User registered successfully",
      });
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
};
