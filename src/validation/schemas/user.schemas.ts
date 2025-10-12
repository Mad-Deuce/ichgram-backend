import Joi from "joi";

import {
  emailPattern,
  passwordPattern,
  usernamePattern,
} from "../patterns/auth.patterns";

export const emailSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.regexp).min(5).required(),
});

export const usernameSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(usernamePattern.regexp)
    .min(3)
    .required(),
});

export const roleSchema = Joi.object({
  roleId: Joi.number().min(1).required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().trim().allow("").pattern(usernamePattern.regexp),
  about: Joi.string().trim().allow("").max(150),
  website: Joi.string().trim().allow("").max(150),
});
