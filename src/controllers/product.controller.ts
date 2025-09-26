import { Request, Response } from "express";

import { addProduct, getProducts } from "../services/product.service";

export const getAllProductsController = async (req: Request, res: Response) => {
  const publishers = await getProducts();
  res.status(200).json(publishers);
};

export const addProductController = async (req: Request, res: Response) => {
  const publisher = await addProduct(req.body);
  res.status(201).json(publisher);
};
