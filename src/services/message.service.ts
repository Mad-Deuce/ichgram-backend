import { Op } from "sequelize";

import { IChat, IMessage } from "../typescript/interfaces";

import Chat from "../db/models/Chat";
import User from "../db/models/User";
import Message from "../db/models/Message";


export const getMessagesByChatId = async (
  chatId: number
): Promise<IMessage[]> => {
  const messageModels: Message[] = await Message.findAll({
    where: { chatId },
    include: [
      {
        model: User,
        as: "author",
        attributes: {
          exclude: ["password", "role", "isVerified"],
        },
      },
    ],
  });
  const messages: IMessage[] = messageModels.map((message) => message.toJSON());
  return messages;
};

export const createMessage = async (message: IMessage): Promise<IMessage> => {
  const createdMessage: Message = await Message.create(message);
  return createdMessage.toJSON();
};
