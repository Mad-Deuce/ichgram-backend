import Joi from "joi";

import { emailPattern, passwordPattern } from "../patterns/auth.patterns";

export const signupSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.value).min(5).required(),
  password: Joi.string()
    .trim()
    .pattern(passwordPattern.value)
    .min(5)
    .required(),
  fullname: Joi.string().trim(),
  username: Joi.string().trim(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.value).min(5).required(),
  password: Joi.string().trim().required(),
});

export const passwordSchema = Joi.object({
  password: Joi.string()
    .trim()
    .pattern(passwordPattern.value)
    .min(5)
    .required(),
});

export const updateSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.value).min(5),
  password: Joi.string().trim().pattern(passwordPattern.value).min(5),
  fullname: Joi.string().trim(),
  username: Joi.string().trim(),
});
