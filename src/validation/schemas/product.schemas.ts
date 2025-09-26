import Joi from "joi";

export const productAddSchema = Joi.object({
  name: Joi.string().trim().min(5).required(),
  price: Joi.number().min(0.01).required(),
  description: Joi.string().trim().min(5),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().trim().min(5),
  price: Joi.number().min(0.01),
  description: Joi.string().trim().min(5),
});
