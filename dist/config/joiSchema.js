"use strict";
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const spendRule = {
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    category: Joi.string()
        .min(3)
        .required(),
    value: Joi.number().required(),
    local: Joi.string()
        .min(3)
        .required(),
    date: Joi.string()
        .min(3)
        .required()
};
const userRule = {
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .min(6)
        .max(50)
        .required(),
    email: Joi.string()
        .min(3)
        .max(50)
        .email()
        .required(),
    income: Joi.number().required(),
    birthdate: Joi.string().required()
};
module.exports = {
    spend: spendRule,
    user: userRule
};
