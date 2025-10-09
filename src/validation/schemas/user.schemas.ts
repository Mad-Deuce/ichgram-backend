import Joi from "joi";

import { emailPattern, usernamePattern } from "../patterns/auth.patterns";

export const emailSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.regexp).min(5).required(),
});

export const usernameSchema = Joi.object({
  username: Joi.string().trim().pattern(usernamePattern.regexp).min(3).required(),
});

export const roleSchema = Joi.object({
  roleId: Joi.number().min(1).required(),
});