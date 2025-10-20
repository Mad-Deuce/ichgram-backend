import { Request, Response } from "express";

import { IAuthRequest, IComment } from "../typescript/interfaces";

import { createComment } from "../services/comment.service";

export const createCommentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);

  const comment: IComment = await createComment({
    ...req.body,
    userId: Number((req as IAuthRequest).user.get("id")),
  });

  res.status(201).json({
    message: `Comment successfully created`,
    comment,
  });
};
