import Joi from "joi";

export const createPostSchema = Joi.object({
  comment: Joi.string().trim().allow(""),
});
