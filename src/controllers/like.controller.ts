import { Request, Response } from "express";

import { IAuthRequest, ILike } from "../typescript/interfaces";

import { createLike } from "../services/like.service";

export const createLikeController = async (
  req: Request,
  res: Response
): Promise<void> => {

  const like: ILike = await createLike({
    ...req.body,
    userId: Number((req as IAuthRequest).user.get("id")),
  });

  res.status(201).json(like);
};
