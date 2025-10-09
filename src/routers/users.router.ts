import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import checkQueryToken from "../middlewares/checkQueryToken";

import checkRole from "../decorators/checkRole";
import validateBody from "../decorators/validateBody";
import { updateSchema } from "../validation/schemas/auth.schemas";
import {
  emailSchema,
  roleSchema,
  usernameSchema,
} from "../validation/schemas/user.schemas";

import {
  deleteController,
  confirmDeleteController,
  updatePublicDataController,
  updateEmailController,
  confirmCurrentEmailController,
  confirmNewEmailController,
  findUsersByUsernameController,
} from "../controllers/users.controller";
import validateSearch from "../decorators/validateSearch";

const userRouter = Router();

userRouter.delete("/delete", authenticate, deleteController);
userRouter.get("/delete", checkQueryToken, confirmDeleteController);

userRouter.put(
  "/",
  authenticate,
  validateBody(updateSchema),
  updatePublicDataController
);

userRouter.put(
  "/email",
  authenticate,
  validateBody(emailSchema),
  updateEmailController
);

userRouter.get("/email", checkQueryToken, confirmCurrentEmailController);
userRouter.get("/new-email", checkQueryToken, confirmNewEmailController);

userRouter.get(
  "/search",
  authenticate,
  validateSearch(usernameSchema),
  findUsersByUsernameController
);

export default userRouter;
