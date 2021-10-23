const Joi = require("@hapi/joi");

//  This file contails all the Joi schemas

const authSchema = Joi.object({
  regType: Joi.string().valid("self", "gmail"),
  fName: Joi.string().required(),
  lName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phoneNo: Joi.string(),
  password: Joi.string().min(8).required(),
  vMethod: Joi.string().valid("email", "phone"),
  uPhoto: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  authSchema,
  loginSchema,
};
