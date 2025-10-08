import { Op, Sequelize } from "sequelize";

import { ILike, INotification, IUser } from "../typescript/interfaces";
import Like from "../db/models/Like";
import HttpError from "../typescript/classes/HttpError";
import User from "../db/models/User";
import { emitNotificationEvent } from "../eventHandler/notificationEventsHandler";
import NotificationTypes from "../constants/NotificationTypes";

export const createLike = async (like: ILike): Promise<ILike> => {
  const [createdLike, isCreated]: [Like, boolean] = await Like.findOrCreate({
    where: { ...like },
  });
  if (!isCreated) throw new HttpError(409, "The post has already been liked");

  emitNotificationEvent({
    authorUserId: like.userId,
    type: NotificationTypes.LIKED,
    targetPostId: like.postId,
  } as INotification);

  return createdLike.toJSON();
};

export const getLikesCount = async (
  postIds: number[]
): Promise<(ILike & { count?: number })[]> => {
  const likeCounts: Like[] = await Like.findAll({
    where: {
      postId: { [Op.in]: postIds },
    },
    attributes: [
      "postId",
      [Sequelize.fn("COUNT", Sequelize.col("postId")), "count"],
    ],
    group: ["postId"],
  });
  const likes: (ILike & { count?: number })[] = likeCounts.map((like) =>
    like.toJSON()
  );



  return likes;
};

export const isPostsLiked = async (
  postIds: number[],
  userId: number
): Promise<ILike[]> => {
  const likeCounts: Like[] = await Like.findAll({
    where: {
      postId: { [Op.in]: postIds },
      userId,
    },
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("postId")), "postId"]],
  });
  const likes: ILike[] = likeCounts.map((comment) => comment.toJSON());
  return likes;
};
