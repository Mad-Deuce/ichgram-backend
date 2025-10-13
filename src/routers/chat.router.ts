import { Router } from "express";

import authenticate from "../middlewares/authenticate";

import validateBody from "../decorators/validateBody";

import { createChatSchema } from "../validation/schemas/chat.schemas";
import {
  createChatController,
  getChatsController,
} from "../controllers/chat.controller";

const chatRouter: Router = Router();

chatRouter.post(
  "/",
  authenticate,
  validateBody(createChatSchema),
  createChatController
);

chatRouter.get("/", authenticate, getChatsController);

export default chatRouter;
