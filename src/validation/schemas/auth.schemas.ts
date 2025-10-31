import Joi from "joi";

import {
  emailPattern,
  passwordPattern,
  fullnamePattern,
  usernamePattern,
} from "../patterns/auth.patterns";

/**
 * @openapi
 * components:
 *  schemas:
 *    SignupRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: passWord1
 *        fullname:
 *          type: string
 *          default: some fullname
 *        username:
 *          type: string
 *          default: some username
 *    SignupResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: 'Signup successfully, a message containing a confirmation link has been sent to email: jane.doe@example.com'
 */

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
