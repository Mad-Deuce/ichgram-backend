import { Router } from "express";

import authenticate from "../middlewares/authenticate";

import validateBody from "../decorators/validateBody";
import { createCommentSchema } from "../validation/schemas/comment.schemas";

import { createCommentController } from "../controllers/comment.controller";

const commentRouter: Router = Router();

commentRouter.post(
  "/",
  authenticate,
  validateBody(createCommentSchema),
  createCommentController
);

export default commentRouter;
