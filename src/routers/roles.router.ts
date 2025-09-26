import { Router } from "express";

import { getRolesController } from "../controllers/roles.controller";

const rolesRouter = Router();

rolesRouter.get("/", getRolesController);

export default rolesRouter;
