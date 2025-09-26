import Product from "../db/models/Product";

export const getProducts = async () => {
  const products = await Product.find().populate('category');
  return products;
};

export const addProduct = async (payload: any) => {
  const product = await Product.create(payload);
  return product;
};
