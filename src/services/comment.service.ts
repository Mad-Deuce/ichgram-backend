import Post from "../db/models/Post";
import User from "../db/models/User";
import { IPost } from "../typescript/interfaces";
import { IComment } from "../typescript/interfaces";
import Comment from "../db/models/Comment";

export const createComment = async (comment: IComment): Promise<IComment> => {
  const createdComment: Comment = await Comment.create({
    ...comment,
  });
  return createdComment.toJSON();
};
