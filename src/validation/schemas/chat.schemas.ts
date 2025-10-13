import Joi from "joi";

export const createChatSchema = Joi.object({
  member2Id: Joi.number().required(),
});

export const createMessageSchema = Joi.object({
  chatId: Joi.number().required(),
  authorId: Joi.number().required(),
  text: Joi.string().max(2200).required(),
});
