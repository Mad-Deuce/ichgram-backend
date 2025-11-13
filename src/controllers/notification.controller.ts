import { Request, Response } from "express";

import { IAuthRequest, INotification } from "../typescript/interfaces";

import {
  getPersonalNotification,
  markAllNotification,
  markNotification,
} from "../services/notification.service";

export const getLastNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notifications: INotification[] = await getPersonalNotification(
    Number((req as IAuthRequest).user.get("id"))
  );
  res.status(200).json(notifications);
};

export const markNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notificationId: number = Number(req.params.id);
  const markedNotificationId: number = await markNotification(
    Number((req as IAuthRequest).user.get("id")),
    notificationId
  );
  res.status(200).json(markedNotificationId);
};

export const markAllNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notificationIds: number[] = req.body.ids;
  const markedNotificationIds: number[] = await markAllNotification(
    Number((req as IAuthRequest).user.get("id")),
    notificationIds
  );
  res.status(200).json(markedNotificationIds);
};
