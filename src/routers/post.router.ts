import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import upload from "../middlewares/upload";

import validateBody from "../decorators/validateBody";
import { createPostSchema } from "../validation/schemas/post.schemas";

import { createPostController, deletePostController, findPostsController, getDetailedPostByIdController, getLastUpdatedPostsController, getPostsController } from "../controllers/post.controller";

const postRouter: Router = Router();

postRouter.post(
  "/",
  authenticate,
  upload.single("image"),
  validateBody(createPostSchema),
  createPostController
);
postRouter.get("/updates", authenticate, getLastUpdatedPostsController)
// postRouter.get("/", authenticate, getPostsController)
postRouter.get("/:id", authenticate, getDetailedPostByIdController)
postRouter.delete("/:id", authenticate, deletePostController)
postRouter.get("/", authenticate, findPostsController)

export default postRouter;
