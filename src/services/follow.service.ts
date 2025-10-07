import { IFollow } from "../typescript/interfaces";
import HttpError from "../typescript/classes/HttpError";
import Follow from "../db/models/Follow";

export const createFollow = async (follow: IFollow): Promise<IFollow> => {
  const [createdFollow, isCreated]: [Follow, boolean] = await Follow.findOrCreate(
    {
      where: { ...follow },
    }
  );
  if (!isCreated) throw new HttpError(409, "The user has already been followed");
  return createdFollow.toJSON();
};
