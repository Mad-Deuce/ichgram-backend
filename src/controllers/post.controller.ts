import { Request, Response } from "express";

import { IAuthRequest } from "../typescript/interfaces";
import { IUser } from "../typescript/interfaces";
import { IPost } from "../typescript/interfaces";

import { createPost, getLastUpdatedPosts } from "../services/post.service";
import HttpError from "../typescript/classes/HttpError";

export const createPostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) throw new HttpError(400, "File required");
  const post: IPost = await createPost((req as IAuthRequest).user, {
    ...req.body,
    image: req.file?.filename,
  });
  res.status(201).json({
    message: `Post successfully created`,
    post,
  });
};

export const getLastUpdatedPostsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const posts: IPost[] =await getLastUpdatedPosts();
  res.status(200).json({
    message: `Request successfully processed`,
    posts,
  });
};
