import Post from "../db/models/Post";
import User from "../db/models/User";
import { IPost } from "../typescript/interfaces";

export const createPost = async (user: User, post: IPost): Promise<IPost> => {
  const createdPost: Post = await Post.create({
    ...post,
    userId: user.get("id") as number,
  });
  return createdPost.toJSON();
};

export const getLastUpdatedPosts = async (): Promise<IPost[]> => {
  const posts: (Post & { user?: User })[] = await Post.findAll({
    limit: 4,
    order: [["updatedAt", "DESC"]],
    include: { model: User, as: "user" },
  });
  return posts.map((post) => post.toJSON());
};
