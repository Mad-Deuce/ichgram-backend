import { Op } from "sequelize";

import {
  IComment,
  ILike,
  INotification,
  IPost,
  IPostResponse,
  IUser,
} from "../typescript/interfaces";

import Post from "../db/models/Post";
import User from "../db/models/User";
import Comment from "../db/models/Comment";
import Like from "../db/models/Like";
import Follow from "../db/models/Follow";

import { getCommentsByPostIds } from "./comment.service";
import { getLikesCount, isPostsLiked } from "./like.service";
import HttpError from "../typescript/classes/HttpError";
import { getLastUpdates } from "./notification.service";
import { number } from "joi";

export const createPost = async (post: IPost): Promise<IPost> => {
  const createdPost: Post = await Post.create({
    ...post,
  });
  return createdPost.toJSON();
};

const getPostIds = async (): Promise<number[]> => {
  const postModels: Post[] = await Post.findAll({
    order: [["updatedAt", "DESC"]],
    limit: 20,
    attributes: ["id"],
  });
  const postIds = postModels.map((post) => post.toJSON().id);

  return postIds;
};

export const getPostsByIds = async (
  userId: number,
  postIds: number[]
): Promise<(IPost & { user?: IUser })[]> => {
  const postModels: (Post & { user?: User })[] = await Post.findAll({
    order: [["updatedAt", "DESC"]],
    where: {
      id: {
        [Op.in]: postIds,
      },
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "role", "isVerified"] },
        include: [
          {
            model: Follow,
            as: "followers",
            where: { followerUserId: userId },
            required: false,
          },
        ],
      },
    ],
  });
  const result: (IPost & { user?: IUser })[] = postModels.map((post) =>
    post.toJSON()
  );
  return result;
};

const detailPosts = async (
  userId: number,
  posts: IPost[],
  noLimit: boolean = false
): Promise<any> => {
  const postIds: number[] = posts.map((post) => post.id);

  const comments: (IComment & { user?: IUser })[] = await getCommentsByPostIds(
    postIds
  );

  posts.forEach((post) => {
    comments.forEach((comment) => {
      if (post.id === comment.postId) {
        if (!post.comments) post.comments = [];
        if (!post.totalComments) post.totalComments = 0;
        post.comments.push(comment);
        post.totalComments += 1;
      }
    });
    if (Array.isArray(post.comments)) {
      post.comments = post.comments.sort(
        (a, b) => (b.updatedAt as any) - (a.updatedAt as any)
      );
      if (!noLimit) {
        post.comments = post.comments.slice(0, 4);
      }
    }
  });

  const likes: (ILike & { count?: number })[] = await getLikesCount(postIds);
  const isLiked: ILike[] = await isPostsLiked(postIds, userId);

  posts.forEach((post) => {
    likes.forEach((like) => {
      if (post.id === like.postId) {
        post.totalLikes = like.count;
      }
    });

    isLiked.forEach((like) => {
      if (post.id === like.postId) {
        post.isLiked = true;
      }
    });
  });

  return posts;
};

export const getLastUpdatedPosts = async (userId: number): Promise<any> => {
  const myPostModels = await Post.findAll({
    limit: 10,
    order: [["updatedAt", "DESC"]],
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "role", "isVerified"] },
        include: [
          {
            model: Follow,
            as: "followers",
            where: { followerUserId: userId },
            required: false,
          },
        ],
      },
    ],
  });
  const resultLength = myPostModels.length;
  const posts: IPost[] = myPostModels.map((post) => post.toJSON());

  if (resultLength > 9) return detailPosts(userId, posts);

  const othersPostModels = await Post.findAll({
    limit: 10 - resultLength,
    order: [["updatedAt", "DESC"]],
    where: {
      userId: {
        [Op.ne]: userId,
      },
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "role", "isVerified"] },
        include: [
          {
            model: Follow,
            as: "followers",
            where: { followerUserId: userId },
            required: false,
          },
        ],
      },
    ],
  });
  const othersPosts: IPost[] = othersPostModels.map((post) => post.toJSON());

  return detailPosts(userId, posts.concat(othersPosts));
};

export const getPosts = async (): Promise<any> => {
  const posts = await Post.findAll({
    limit: 15,
  });
  return posts;
};

export const findPosts = async (search: IPost): Promise<any> => {
  const posts = await Post.findAll({
    limit: 15,
    where: { ...search },
  });
  return posts;
};

export const getPostById = async (postId: number): Promise<IPost> => {
  const result: (Post & { user?: User }) | null = await Post.findByPk(postId, {
    include: {
      model: User,
      as: "user",
    },
  });
  if (!result) throw new HttpError(404, "user not found");

  return result.toJSON();
};

export const getDetailedPostById = async (
  postId: number,
  userId: number
): Promise<IPost> => {
  const postModel: (Post & { user?: User }) | null = await Post.findByPk(
    postId,
    {
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "role", "isVerified"] },
        include: [
          {
            model: Follow,
            as: "followers",
            where: { followerUserId: userId },
            required: false,
          },
        ],
      },
    }
  );
  if (!postModel) throw new HttpError(404, "post not found");

  const detailedPost: IPost[] = await detailPosts(
    userId,
    [postModel.toJSON()],
    true
  );

  if (!detailedPost[0]) {
    throw new HttpError(404, "Detailed post not found");
  }
  return detailedPost[0];
};

export const updatePostDate = async (postId: number): Promise<void> => {
  const post = await Post.findByPk(postId);

  if (post) {
    post.changed("updatedAt" as keyof Post, true);
    await post.update({ updatedAt: new Date() });
  }
};

export const countPostsByUser = async (userId: number): Promise<number> => {
  return await Post.count({
    where: {
      userId,
    },
  });
};

export const deletePostById = async (postId: number, userId: number): Promise<void> => {
  const deletingPost: Post | null = await Post.findByPk(postId)
  if (!deletingPost) throw new HttpError(400, "Post not found");
  if (deletingPost.get("userId") !== userId) throw new HttpError(403, "You are not the owner of the post");
  const result: number = await Post.destroy({ where: { id: postId } });
  if (!result) throw new HttpError(500, "destroy not completed");
};
