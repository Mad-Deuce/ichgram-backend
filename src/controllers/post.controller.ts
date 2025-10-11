import { Request, Response } from "express";

import { IAuthRequest, IPost, IComment } from "../typescript/interfaces";

import { createPost, findPosts, getLastUpdatedPosts, getPosts } from "../services/post.service";
import { createComment } from "../services/comment.service";
import HttpError from "../typescript/classes/HttpError";

export const createPostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) throw new HttpError(400, "File required");
  const post: IPost & { comment?: IComment } = await createPost({
    image: req.file.filename,
    userId: Number((req as IAuthRequest).user.get("id")),
  } as IPost);
  if (req.body.comment) {
    post.comment = await createComment({
      userId: post.userId,
      postId: post.id,
      text: req.body.comment,
    } as IComment);
  }
  res.status(201).json({
    message: `Post successfully created`,
    post,
  });
};

export const getLastUpdatedPostsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const posts: IPost[] = await getLastUpdatedPosts(Number((req as IAuthRequest).user.get("id")));
  res.status(200).json({
    message: `Request successfully processed`,
    posts,
  });
};

export const getPostsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const posts: IPost[] = await getPosts();
  res.status(200).json({
    message: `Request successfully processed`,
    posts,
  });
};

export const findPostsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const search: Partial<IPost> = req.query;

  
  const posts: IPost[] = await findPosts(search as IPost);
  res.status(200).json({
    message: `Request successfully processed`,
    posts,
  });
};