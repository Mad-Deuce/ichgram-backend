import { IComment, ILike } from "../typescript/interfaces";
import Like from "../db/models/Like";

export const createLike = async (like: ILike): Promise<ILike> => {
  const createdLike: Like = await Like.create({
    ...like,
  });
  return createdLike.toJSON();
};
