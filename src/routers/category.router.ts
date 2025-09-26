import { Router } from "express";

import {
  addCategoryController,
  getAllCategoryController,
} from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategoryController);
categoryRouter.post("/", addCategoryController);

export default categoryRouter;
