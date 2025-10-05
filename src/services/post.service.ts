import Post from "../db/models/Post";
import User from "../db/models/User";
import { IPost } from "../typescript/interfaces";

export const createPost = async ( post: IPost): Promise<IPost> => {
  const createdPost: Post = await Post.create({
    ...post,
  });
  return createdPost.toJSON();
};

export const getLastUpdatedPosts = async (): Promise<IPost[]> => {
  const posts: (Post & { user?: User })[] = await Post.findAll({
    limit: 4,
    order: [["updatedAt", "DESC"]],
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password", "role", "isVerified"] },
    },
  });
  return posts.map((post) => post.toJSON());
};
