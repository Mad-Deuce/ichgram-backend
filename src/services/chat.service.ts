import { Op } from "sequelize";

import { IChat } from "../typescript/interfaces";

import Chat from "../db/models/Chat";
import User from "../db/models/User";
import Message from "../db/models/Message";

export const findOrCreateChat = async (
  member1Id: number,
  member2Id: number
): Promise<IChat> => {
  console.log("member1Id: ", member1Id);
  console.log("member2Id: ", member2Id);

  const [chatModel, created]: [Chat, boolean] = await Chat.findOrCreate({
    where: {
      member1Id: {
        [Op.in]: [member1Id, member2Id],
      },
      member2Id: {
        [Op.in]: [member1Id, member2Id],
      },
    },
    include: [
      {
        model: User,
        as: "member1",
        attributes: {
          exclude: ["password", "role", "isVerified"],
        },
      },
      {
        model: User,
        as: "member2",
        attributes: {
          exclude: ["password", "role", "isVerified"],
        },
      },
    ],
    defaults: { member1Id, member2Id } as IChat,
  });

  if (created)
    return findOrCreateChat(
      chatModel.get("member1Id") as number,
      chatModel.get("member2Id") as number
    );

  return chatModel.toJSON();
};

export const getChats = async (userId: number): Promise<IChat[]> => {
  const chatModels: Chat[] = await Chat.findAll({
    where: {
      [Op.or]: [{ member1Id: userId }, { member2Id: userId }],
    },
    include: [
      {
        model: User,
        as: "member1",
        attributes: {
          exclude: ["password", "role", "isVerified"],
        },
        include: [
          {
            model: Message,
            as: "messages",
            limit: 1,
            order: [["updatedAt", "DESC"]],
          },
        ],
      },
      {
        model: User,
        as: "member2",
        attributes: {
          exclude: ["password", "role", "isVerified"],
        },
        include: [
          {
            model: Message,
            as: "messages",
            limit: 1,
            order: [["updatedAt", "DESC"]],
          },
        ],
      },
    ],
  });

  const chats: IChat[] = chatModels.map((chat) => chat.toJSON());

  return chats;
};
