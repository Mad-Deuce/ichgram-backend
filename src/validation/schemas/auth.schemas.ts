import Joi from "joi";

import {
  emailPattern,
  passwordPattern,
  fullnamePattern,
  usernamePattern,
} from "../patterns/auth.patterns";

export const signupSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.regexp).min(5).required(),
  password: Joi.string()
    .trim()
    .pattern(passwordPattern.regexp)
    .min(5)
    .required(),
  fullname: Joi.string().trim().allow("").pattern(fullnamePattern.regexp),
  username: Joi.string().trim().allow("").pattern(usernamePattern.regexp),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.regexp).min(5).required(),
  password: Joi.string().trim().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.regexp).min(5).required(),
});

export const passwordSchema = Joi.object({
  password: Joi.string()
    .trim()
    .pattern(passwordPattern.regexp)
    .min(5)
    .required(),
  confirmPassword: Joi.ref("password"),
});

export const updateSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.regexp).min(5),
  password: Joi.string().trim().pattern(passwordPattern.regexp).min(5),
  fullname: Joi.string().trim(),
  username: Joi.string().trim(),
});
