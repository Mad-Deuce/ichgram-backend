import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import upload from "../middlewares/upload";

import validateBody from "../decorators/validateBody";
import { createPostSchema } from "../validation/schemas/post.schemas";

import { createPostController } from "../controllers/post.controller";

const postRouter: Router = Router();

postRouter.post(
  "/",
  authenticate,
  upload.single("image"),
  validateBody(createPostSchema),
  createPostController
);

export default postRouter;
