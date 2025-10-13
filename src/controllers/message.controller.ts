import { Request, Response } from "express";

import { IAuthRequest, IMessage } from "../typescript/interfaces";

import {
  createMessage,
  getMessagesByChatId,
} from "../services/message.service";

export const createMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const createdMessage = await createMessage({
    ...req.body,
    authorId: (req as IAuthRequest).user.get("id"),
  });
  res.status(201).json(createdMessage);
};

export const getMessagesByChatIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const chatId: number = Number(req.params.chatId);
  const messages: IMessage[] = await getMessagesByChatId(chatId);
  res.status(200).json(messages);
};
