const Joi = require("joi");
const validation = require("../config/joiSchema");

module.exports = {
  async validateInput(req, res, next) {
    const dataToValidate = req.body;
    try {
      await Joi.validate(dataToValidate, validation);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }
};
