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

export const createPost = async (post: IPost): Promise<IPost> => {
  const createdPost: Post = await Post.create({
    ...post,
  });
  return createdPost.toJSON();
};

const getLastUpdatedPostIds = async (userId: number): Promise<number[]> => {
  const lastUpdates: INotification[] = await getLastUpdates(userId);
  const lastUpdatedPostIds: number[] = lastUpdates
    .map((notification) => notification.targetPostId)
    .filter((id): id is number => id !== null);
  const lastUpdatedPostIdsSet: number[] = [...new Set(lastUpdatedPostIds)];

  const resultLength = lastUpdatedPostIdsSet.length;
  if (resultLength > 9) return lastUpdatedPostIds;

  const postModels: Post[] = await Post.findAll({
    limit: 10 - resultLength,
    order: [["updatedAt", "DESC"]],
    where: {
      id: {
        [Op.notIn]: lastUpdatedPostIds,
      },
    },
    attributes: ["id"],
  });
  const postIds = postModels.map((post) => post.toJSON().id);

  const postIdsSet: number[] = [...new Set(lastUpdatedPostIds.concat(postIds))];
  return postIdsSet;
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

const getDetailedPosts = async (
  userId: number,
  posts: IPost[]
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
      post.comments = post.comments
        .sort((a, b) => (b.updatedAt as any) - (a.updatedAt as any))
        .slice(0, 4);
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
  const lastUpdatedPostIds: number[] = await getLastUpdatedPostIds(userId);
  const posts = await getPostsByIds(userId, lastUpdatedPostIds);
  const detailedPosts = getDetailedPosts(userId, posts);
  return detailedPosts;
};

/**
 * @deprecated The method should not be used
 */
export const getLastUpdatedPostsAlt2 = async (userId: number): Promise<any> => {
  const postModels: Post[] = await Post.findAll({
    limit: 4,
    order: [["updatedAt", "DESC"]],
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

  const posts: IPostResponse[] = postModels.map((post) => post.toJSON());

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
      post.comments = post.comments
        .sort((a, b) => (b.updatedAt as any) - (a.updatedAt as any))
        .slice(0, 4);
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

/**
 * @deprecated The method should not be used
 */
export const getLastUpdatedPostsAlt = async (
  userId: number
): Promise<IPost[]> => {
  const posts: (Post & {
    user?: User;
    comments?: Comment[];
    likes?: Like[];
  })[] = await Post.findAll({
    limit: 4,
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "role", "isVerified"] },
        include: [
          {
            model: Follow,
            as: "followers",
            // where: {followerUserId: userId},
            // include: [
            //   {
            //     model: User,
            //     where: {id: userId},
            //     as: "followerUser",
            //     attributes: { exclude: ["password", "role", "isVerified"] },
            //   },
            // ],
          },
        ],
      },
      {
        model: Comment,
        as: "comments",
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: User,
            as: "user",
            attributes: { exclude: ["password", "role", "isVerified"] },
          },
        ],
      },
      {
        model: Like,
        as: "likes",
      },
    ],
  });
  const result = posts.map((post) => post.toJSON());
  console.log(result);

  return result.map((item) => ({
    ...item,
    comments: item.comments ? item.comments.slice(0, 4) : [],
    isLiked: item.likes
      ? Array.isArray(item.likes) &&
        item.likes.some((like) => like.userId === userId)
      : false,
  }));
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
