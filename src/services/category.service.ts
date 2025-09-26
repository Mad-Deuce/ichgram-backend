import Category from "../db/models/Category";

export const getCategories = async () => {
  const tags = await Category.find();
  return tags;
};

export const addCategory = async (payload: any) => {
  const tag = await Category.create(payload);
  return tag;
};
