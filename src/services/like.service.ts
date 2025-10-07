import {  ILike } from "../typescript/interfaces";
import Like from "../db/models/Like";
import HttpError from "../typescript/classes/HttpError";

export const createLike = async (like: ILike): Promise<ILike> => {
  const [createdLike, isCreated]: [Like, boolean] = await Like.findOrCreate({
    where: { ...like },
  });
  if (!isCreated) throw new HttpError(409, "The post has already been liked");
  return createdLike.toJSON();
};
