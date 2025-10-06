import { Router } from "express";

import authenticate from "../middlewares/authenticate";

import validateBody from "../decorators/validateBody";
import { createLikeSchema } from "../validation/schemas/like.schemas";

import { createLikeController } from "../controllers/like.controller";

const likeRouter: Router = Router();

likeRouter.post(
  "/",
  authenticate,
  validateBody(createLikeSchema),
  createLikeController
);

export default likeRouter;
