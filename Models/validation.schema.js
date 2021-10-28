const Joi = require("@hapi/joi");

//  This file contails all the Joi schemas

// Register Joi Schema
const authSchema = Joi.object({
  regType: Joi.string().valid("self", "gmail"),
  fName: Joi.string()
    .regex(/[a-zA-Z]/)
    .required(),
  lName: Joi.string()
    .regex(/[a-zA-Z]/)
    .required(),
  email: Joi.string().email().lowercase(),
  phoneNo: Joi.string().max(10).regex(/[0-9]/),
  password: Joi.string()
    .min(8)
    .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
    .required(),
  uPhoto: Joi.string(),
})
  .or("email", "phoneNo")
  .without("email", "phoneNo")
  .without("phoneNo", "email");

// Login Joi Schema
const loginSchema = Joi.object({
  phoneNo: Joi.string().max(10).regex(/[0-9]/).optional(),
  email: Joi.string().email().lowercase().optional(),
  password: Joi.string()
    .min(8)
    .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
    .required(),
}).or("phoneNo", "email");

// Verify Email Schema
const verifyEmailSchema = Joi.object({
  headers: Joi.object()
    .keys({
      VerificationType: Joi.string().regex(/[0-9]/),
    })
    .options({ allowUnknown: true }),
});

// Update Profile Schema
const updateSchema = Joi.object({
  fName: Joi.string().regex(/[a-zA-Z]/),
  lName: Joi.string().regex(/[a-zA-Z]/),
  uPhoto: Joi.string(),
}).or("fName", "lName", "uPhoto");

const updatePassJoi = Joi.object({
  oldPassword: Joi.string()
    .min(8)
    .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
    .required(),
  newPassword: Joi.string()
    .min(8)
    .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
    .required(),
});

const updateCredJoi = Joi.object({
  password: Joi.string()
    .min(8)
    .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
    .required(),
  email: Joi.string().email().lowercase().optional(),
  phoneNo: Joi.string().max(10).regex(/[0-9]/).optional(),
}).or("phoneNo", "email");

module.exports = {
  authSchema,
  loginSchema,
  updateSchema,
  updatePassJoi,
  updateCredJoi,
};
