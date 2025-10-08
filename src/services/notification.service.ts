import { Op } from "sequelize";
import Notification from "../db/models/Notification";
import { INotification } from "../typescript/interfaces";

export const createNotification = async (
  payload: INotification
): Promise<INotification> => {
  const result: Notification = await Notification.create({ ...payload });
  return result.toJSON();
};

export const getLastUpdates = async (
  userId: number
): Promise<INotification[]> => {
  const personalNotificationModels: Notification[] = await Notification.findAll(
    {
      where: {
        targetUserId: userId,
      },
      limit: 10,
    }
  );

  const personalNotifications: INotification[] = personalNotificationModels.map(
    (notification) => notification.toJSON()
  );
  const resultLength = personalNotifications.length;
  if (resultLength > 9) return personalNotifications;
  const otherNotificationModels: Notification[] = await Notification.findAll({
    where: {
      targetUserId: { [Op.not]: userId },
    },
    limit: 10 - resultLength,
  });
  const otherNotifications: INotification[] = otherNotificationModels.map(
    (notification) => notification.toJSON()
  );
  return personalNotifications.concat(otherNotifications);
};
