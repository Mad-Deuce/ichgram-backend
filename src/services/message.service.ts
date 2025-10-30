import User from "../db/models/User";
import Message from "../db/models/Message";
import Chat from "../db/models/Chat";

import HttpError from "../typescript/classes/HttpError";
import { IMessage } from "../typescript/interfaces";

export const getMessagesByChatId = async (
  chatId: number
): Promise<IMessage[]> => {
  const messageModels: Message[] = await Message.findAll({
    where: { chatId },
    include: [
      {
        model: User,
        as: "author",
      },
    ],
  });
  const messages: IMessage[] = messageModels.map((message) => message.toJSON());
  return messages;
};

export const createMessage = async (message: IMessage): Promise<IMessage> => {
  const createdMessage: Message = await Message.create(message);
  const detailedMessage: Message | null = await Message.findByPk(
    createdMessage.get("id") as number,
    {
      include: [
        {
          model: User,
          as: "author",
        },
      ],
    }
  );
  if (!detailedMessage) throw new HttpError(500, "Something wrong");
  return detailedMessage.toJSON();
};

export const getMessageById = async (id: number): Promise<IMessage> => {
  const messageModel: Message | null = await Message.findByPk(id, {
    include: [
      {
        model: User,
        as: "author",
      },
      { model: Chat, as: "chat" },
    ],
  });
  if (!messageModel) throw new HttpError(500, "Something wrong");
  return messageModel.toJSON();
};
