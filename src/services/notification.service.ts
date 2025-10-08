import Notification from "../db/models/Notification";
import { INotification } from "../typescript/interfaces";

export const createNotification = async (
  payload: INotification
): Promise<INotification> => {
  const result: Notification = await Notification.create({ ...payload });
  return result.toJSON();
};
