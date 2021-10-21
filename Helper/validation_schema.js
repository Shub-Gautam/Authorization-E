const Joi = require("@hapi/joi");

//  This file contails all the Joi schemas

// Complete this schema
const authSchema = Joi.object({
  Email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  Email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  authSchema,
  loginSchema,
};
