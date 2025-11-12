import { Request, Response } from "express";

import { IAuthRequest, INotification } from "../typescript/interfaces";

import { getPersonalNotification } from "../services/notification.service";

export const getLastNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notifications: INotification[] = await getPersonalNotification(
    Number((req as IAuthRequest).user.get("id"))
  );
  res.status(200).json(notifications);
};
