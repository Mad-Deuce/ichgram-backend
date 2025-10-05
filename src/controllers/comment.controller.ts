import { Request, Response } from "express";

import { IAuthRequest, IPost, IComment } from "../typescript/interfaces";

import { createPost, getLastUpdatedPosts } from "../services/post.service";
import { createComment } from "../services/comment.service";
import HttpError from "../typescript/classes/HttpError";

export const createCommentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  
  const comment: IComment = await createComment({ ...req.body,  userId: Number((req as IAuthRequest).user.get("id")) });

  res.status(201).json({
    message: `Comment successfully created`,
    comment,
  });
};
