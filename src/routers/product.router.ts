import { Router } from "express";

import {
  addProductController,
  getAllProductsController,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getAllProductsController);
productRouter.post("/", addProductController);

export default productRouter;
