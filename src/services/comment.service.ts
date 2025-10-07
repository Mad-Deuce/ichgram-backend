import { Op } from "sequelize";

import { IComment, IUser } from "../typescript/interfaces";
import Comment from "../db/models/Comment";
import User from "../db/models/User";
import HttpError from "../typescript/classes/HttpError";

export const createComment = async (
  comment: IComment
): Promise<IComment & { user?: IUser }> => {
  const createdComment: Comment = await Comment.create({
    ...comment,
  });

  const result: (Comment & { user?: User }) | null = await Comment.findByPk(
    createdComment.get("id") as number,
    {
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password", "role", "isVerified"] },
        },
      ],
    }
  );
  if (!result) throw new HttpError(500, "Something wrong");

  return result.toJSON();
};

export const getCommentsByPostIds = async (
  postIds: number[]
): Promise<(IComment & { user?: IUser })[]> => {
  const commentModels: Comment[] = await Comment.findAll({
    where: {
      postId: { [Op.in]: postIds },
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "role", "isVerified"] },
      },
    ],
  });
  const comments: (IComment & { user?: IUser })[] = commentModels.map(
    (comment) => comment.toJSON()
  );
  return comments;
};
