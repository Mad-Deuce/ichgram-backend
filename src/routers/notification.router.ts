import { Router } from "express";

import authenticate from "../middlewares/authenticate";

import { getLastNotificationController } from "../controllers/notification.controller";

const notificationRouter: Router = Router();


notificationRouter.get("/", authenticate, getLastNotificationController)

export default notificationRouter;
