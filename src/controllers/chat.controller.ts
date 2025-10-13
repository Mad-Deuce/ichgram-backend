import { Request, Response } from "express";

import { IAuthRequest, IChat } from "../typescript/interfaces";

import { getChats, findOrCreateChat } from "../services/chat.service";

export const createChatController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const member1Id: number = Number((req as IAuthRequest).user.get("id"));
  const member2Id: number = req.body.member2Id;
  // const member2Id: number = Number(req.query.member2Id);
  // const member2Id: number = Number(req.params.member2Id);
  const chat: IChat = await findOrCreateChat(member1Id, member2Id);
  res.status(200).json(chat);
};

export const getChatsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const chats: IChat[] = await getChats(
    Number((req as IAuthRequest).user.get("id"))
  );
  res.status(200).json(chats);
};
