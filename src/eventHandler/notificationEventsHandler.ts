import EventEmitter from "node:events";
import NotificationTypes from "../constants/NotificationTypes";
import { INotification } from "../typescript/interfaces";
import { getPostById } from "../services/post.service";
import { createNotification } from "../services/notification.service";
import { emitter } from "./eventEmitter";

emitter.on(NotificationTypes.COMMENTED, async (notification: INotification) => {
  const post = await getPostById(notification.targetPostId);
  notification.targetUserId = post.userId;
  await createNotification(notification);
});

emitter.on(NotificationTypes.LIKED, async (notification: INotification) => {
  const post = await getPostById(notification.targetPostId);
  notification.targetUserId = post.userId;
  await createNotification(notification);
});

emitter.on(NotificationTypes.FOLLOWED, async (notification: INotification) => {
  await createNotification(notification);
});

export const emitNotificationEvent = (notification: INotification) => {
  emitter.emit(notification.type, notification);
};
