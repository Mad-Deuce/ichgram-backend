import Joi from "joi";

import { emailPattern } from "../patterns/auth.patterns";

export const emailSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.regexp).min(5).required(),
});

export const roleSchema = Joi.object({
  roleId: Joi.number().min(1).required(),
});