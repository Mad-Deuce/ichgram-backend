import { Router } from "express";

import authenticate from "../middlewares/authenticate";

import {
  getLastNotificationController,
  markAllNotificationsController,
  markNotificationController,
} from "../controllers/notification.controller";

const notificationRouter: Router = Router();

notificationRouter.get("/", authenticate, getLastNotificationController);
notificationRouter.put("/all/mark", authenticate, markAllNotificationsController);
notificationRouter.put("/:id/mark", authenticate, markNotificationController);


export default notificationRouter;
