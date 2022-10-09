const Joi = require("joi");

const userSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/),

  last_name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/),

  email: Joi.string().email(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),

  password: Joi.string().min(5),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

module.exports = { userSchema, loginSchema };
