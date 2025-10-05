import Joi from "joi";

export const createCommentSchema = Joi.object({
  postId: Joi.number().required(),
  text: Joi.string().trim().max(2200).required(),
});

