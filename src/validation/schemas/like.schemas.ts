import Joi from "joi";

export const createLikeSchema = Joi.object({
  postId: Joi.number().required(),
});

