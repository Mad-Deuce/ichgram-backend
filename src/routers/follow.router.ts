import { Router } from "express";

import authenticate from "../middlewares/authenticate";

import validateBody from "../decorators/validateBody";
import { createFollowSchema } from "../validation/schemas/follow.schemas";

import { createFollowController } from "../controllers/follow.controller";


const followRouter: Router = Router();

followRouter.post(
  "/",
  authenticate,
  validateBody(createFollowSchema),
  createFollowController
);

export default followRouter;
