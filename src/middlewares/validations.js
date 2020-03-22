const Joi = require("joi");
const validationRule = require("../config/joiSchema");

module.exports = {
  async validateNewSpendBody(req, res, next) {
    const body = req.body;
    try {
      await Joi.validate(body, validationRule.spend);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  },
  async validateNewUserBody(req, res, next) {
    const body = req.body;
    try {
      await Joi.validate(body, validationRule.user);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }
};
