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
})
  .without("email", "phoneNo")
  .without("phoneNo", "email");

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const updateSchema = Joi.object({
  fName: Joi.string(),
  lName: Joi.string(),
  uPhoto: Joi.string(),
}).or("fName", "lName", "uPhoto");

module.exports = {
  authSchema,
  loginSchema,
  updateSchema,
};
