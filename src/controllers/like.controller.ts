import { Request, Response } from "express";

import { IAuthRequest, ILike } from "../typescript/interfaces";

import { createLike } from "../services/like.service";

export const createLikeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);

  const like: ILike = await createLike({
    ...req.body,
    userId: Number((req as IAuthRequest).user.get("id")),
  });

  res.status(201).json({
    message: `Like successfully created`,
    like,
  });
};
