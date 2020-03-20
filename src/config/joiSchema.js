const Joi = require("joi");

const bodyValidation = {
  name: Joi.string().min(3),
  category: Joi.string().min(3),
  value: Joi.number(),
  local: Joi.string().min(3),
  date: Joi.string().min(3)
};

module.exports = bodyValidation;
