import { Request, Response } from "express";

import { getCategories, addCategory } from "../services/category.service";

export const getAllCategoryController = async (req: Request, res: Response) => {
  const categories = await getCategories();
  res.status(200).json(categories);
};

export const addCategoryController = async (req: Request, res: Response) => {
  const category = await addCategory(req.body);
  res.status(201).json(category);
};
