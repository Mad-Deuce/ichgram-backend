import Post from "../db/models/Post";
import User from "../db/models/User";
import Comment from "../db/models/Comment";
import { IPost } from "../typescript/interfaces";
import Like from "../db/models/Like";
import Follow from "../db/models/Follow";

export const createPost = async (post: IPost): Promise<IPost> => {
  const createdPost: Post = await Post.create({
    ...post,
  });
  return createdPost.toJSON();
};

export const getLastUpdatedPosts = async (userId: number): Promise<IPost[]> => {
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
            as: "follows",
            include: [
              {
                model: User,
                where: {id: userId},
                as: "followerUser",
                attributes: { exclude: ["password", "role", "isVerified"] },
              },
            ],
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
  return result.map((item) => ({
    ...item,
    comments: item.comments ? item.comments.slice(0, 4) : [],
    isLiked: item.likes
      ? Array.isArray(item.likes) &&
        item.likes.some((like) => like.userId === userId)
      : false,
  }));
};
