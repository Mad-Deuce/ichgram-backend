import { Request, Response } from "express";

import { IAuthRequest, IFollow } from "../typescript/interfaces";

import { createFollow } from "../services/follow.service";

export const createFollowController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);

  const follow: IFollow = await createFollow({
    ...req.body,
    followerUserId: Number((req as IAuthRequest).user.get("id")),
  });

  res.status(201).json(follow);
};
