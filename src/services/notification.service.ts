import { Op } from "sequelize";
import Notification from "../db/models/Notification";
import { INotification } from "../typescript/interfaces";
import User from "../db/models/User";
import Post from "../db/models/Post";
import HttpError from "../typescript/classes/HttpError";

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

export const markNotification = async (
  userId: number,
  notificationId: number
): Promise<number> => {
  await Notification.update(
    { isViewed: true },
    {
      where: {
        targetUserId: userId,
        id: notificationId,
      },
    }
  );
  return notificationId;
};

export const markAllNotification = async (
  userId: number,
  notificationIds: number[]
): Promise<number[]> => {
  await Notification.update(
    { isViewed: true },
    {
      where: {
        targetUserId: userId,
        id: { [Op.in]: notificationIds },
      },
    }
  );
  return notificationIds;
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

export const findNotificationById = async (
  id: number
): Promise<INotification> => {
  const notificationModel: (Notification & { authorUser?: User }) | null =
    await Notification.findByPk(id, {
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
  if (!notificationModel) throw new HttpError(404, "notification not found");

  const notifications: INotification = notificationModel.toJSON();
  return notifications;
};
