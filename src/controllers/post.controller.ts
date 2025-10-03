import { Request, Response } from "express";

import { IAuthRequest } from "../typescript/interfaces";
import { IUser } from "../typescript/interfaces";
import { IPost } from "../typescript/interfaces";

import { createPost } from "../services/post.service";


export const createPostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("postfile: ", req.file);
  const post: IPost = await createPost((req as IAuthRequest).user, {...req.body, image: req.file?.filename});
  res.status(201).json({
    message: `Post successfully created`, post
  });
};
