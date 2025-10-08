import { IFollow, INotification } from "../typescript/interfaces";
import HttpError from "../typescript/classes/HttpError";
import Follow from "../db/models/Follow";
import NotificationTypes from "../constants/NotificationTypes";
import { emitNotificationEvent } from "../eventHandler/notificationEventsHandler";

export const createFollow = async (follow: IFollow): Promise<IFollow> => {
  const [createdFollow, isCreated]: [Follow, boolean] =
    await Follow.findOrCreate({
      where: { ...follow },
    });
  if (!isCreated)
    throw new HttpError(409, "The user has already been followed");

  emitNotificationEvent({
    authorUserId: follow.followerUserId,
    type: NotificationTypes.FOLLOWED,
    targetUserId: follow.targetUserId,
  } as INotification);

  return createdFollow.toJSON();
};

