import { Op } from "sequelize";
import Notification from "../db/models/Notification";
import { INotification } from "../typescript/interfaces";
import User from "../db/models/User";
import Post from "../db/models/Post";

export const createNotification = async (
  payload: INotification
): Promise<INotification> => {
  const result: Notification = await Notification.create({ ...payload });
  return result.toJSON();
};

export const getPersonalNotification = async (
  userId: number
): Promise<INotification[]> => {
  const personalNotificationModels: (Notification & { authorUser?: User })[] =
    await Notification.findAll({
      where: {
        targetUserId: userId,
        isViewed: false,
      },
      order: [["updatedAt", "DESC"]],

      limit: 10,
      include: [
        {
          model: User,
          as: "authorUser",
        },
        {
          model: Post,
          as: "targetPost",
        },
      ],
    });

  const personalNotifications: INotification[] = personalNotificationModels.map(
    (notification) => notification.toJSON()
  );
  return personalNotifications;
};

export const getLastUpdates = async (
  userId: number
): Promise<INotification[]> => {
  const personalNotifications: INotification[] = await getPersonalNotification(
    userId
  );

  const resultLength = personalNotifications.length;
  if (resultLength > 9) return personalNotifications;
  const otherNotificationModels: Notification[] = await Notification.findAll({
    where: {
      targetUserId: { [Op.not]: userId },
    },
    order: [["updatedAt", "ASC"]],
    limit: 10 - resultLength,
  });
  const otherNotifications: INotification[] = otherNotificationModels.map(
    (notification) => notification.toJSON()
  );
  return personalNotifications.concat(otherNotifications);
};
