import { Router } from "express";

import { getUsersController } from "../controllers/users.controller";
import { getSessionsController } from "../controllers/sessions.controller";
import { getRolesController } from "../controllers/roles.controller";

const adminRouter = Router();

adminRouter.get("/users", getUsersController);
adminRouter.get("/sessions", getSessionsController);
adminRouter.get("/roles", getRolesController);

export default adminRouter;
