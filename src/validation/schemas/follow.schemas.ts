import Joi from "joi";

export const createFollowSchema = Joi.object({
  targetUserId: Joi.number().required(),
});

