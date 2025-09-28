import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import checkQueryToken from "../middlewares/checkQueryToken";

import checkRole from "../decorators/checkRole";
import validateBody from "../decorators/validateBody";
import { updateSchema } from "../validation/schemas/auth.schemas";
import { emailSchema, roleSchema } from "../validation/schemas/user.schemas";

import {
  deleteController,
  confirmDeleteController,
  updatePublicDataController,
  updateEmailController,
  confirmCurrentEmailController,
  confirmNewEmailController,
  updateRoleController,
} from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.delete("/delete", authenticate, deleteController);
usersRouter.get("/delete", checkQueryToken, confirmDeleteController);

usersRouter.put(
  "/",
  authenticate,
  validateBody(updateSchema),
  updatePublicDataController
);

usersRouter.put(
  "/email",
  authenticate,
  validateBody(emailSchema),
  updateEmailController
);

usersRouter.get("/email", checkQueryToken, confirmCurrentEmailController);
usersRouter.get("/new-email", checkQueryToken, confirmNewEmailController);

usersRouter.put(
  "/:id/role",
  authenticate,
  checkRole(["super"]),
  validateBody(roleSchema),
  updateRoleController
);

export default usersRouter;
