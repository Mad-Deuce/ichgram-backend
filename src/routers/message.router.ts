import { Router } from "express";

import authenticate from "../middlewares/authenticate";

import validateBody from "../decorators/validateBody";

import { createMessageSchema } from "../validation/schemas/chat.schemas";
import {
  createMessageController,
  getMessagesByChatIdController,
} from "../controllers/message.controller";

const messageRouter: Router = Router();

messageRouter.post(
  "/",
  authenticate,
  validateBody(createMessageSchema),
  createMessageController
);

messageRouter.get("/:chatId", authenticate, getMessagesByChatIdController);

export default messageRouter;
