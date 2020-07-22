import Joi from "joi";
import validationRule from "../config/joiSchema";
import { Request, Response, NextFunction } from 'express'; 

 class Validation {
  async validateNewSpendBody(req:Request, res:Response, next:NextFunction) {
    const body = req.body;
    try {
      await Joi.validate(body, validationRule.spend);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }
  async validateNewUserBody(req:Request, res:Response, next:NextFunction) {
    const body = req.body;
    try {
      await Joi.validate(body, validationRule.user);
      return next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
  }
};

export default new Validation();