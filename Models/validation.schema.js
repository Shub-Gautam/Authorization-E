const Joi = require("@hapi/joi");

//  This file contails all the Joi schemas

const authSchema = Joi.object({
  regType: Joi.string().valid("self", "gmail"),
  fName: Joi.string().required(),
  lName: Joi.string().required(),
  email: Joi.string().email().lowercase(),
  phoneNo: Joi.string(),
  password: Joi.string().min(8).required(),
  uPhoto: Joi.string(),
})
  .without("email", "phoneNo")
  .without("phoneNo", "email");

const loginSchema = Joi.object({
  phoneNo: Joi.string().optional(),
  email: Joi.string().email().lowercase().optional(),
  password: Joi.string().min(8),
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
