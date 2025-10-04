import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().trim().allow(""),
  content: Joi.string().trim().allow(""),
});
