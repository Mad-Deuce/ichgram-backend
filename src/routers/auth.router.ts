import { Router } from "express";

import validateBody from "../decorators/validateBody";
import {
  signupSchema,
  loginSchema,
  emailSchema,
  passwordSchema,
} from "../validation/schemas/auth.schemas";
import authenticate from "../middlewares/authenticate";
import checkQueryToken from "../middlewares/checkQueryToken";

import {
  signupController,
  emailConfirmController,
  loginController,
  refreshController,
  logoutController,
  resetPasswordController,
  updatePasswordController,
  getUserController,
} from "../controllers/auth.controller";

const authRouter: Router = Router();
/**
 * @openapi
 * '/api/auth/signup':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SignupResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server error
 */
authRouter.post("/signup", validateBody(signupSchema), signupController);
authRouter.get("/verify", checkQueryToken, emailConfirmController);

authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.get("/refresh", refreshController);
authRouter.get("/current", authenticate, getUserController);
authRouter.get("/logout", authenticate, logoutController);

authRouter.post("/reset", validateBody(emailSchema), resetPasswordController);
authRouter.put(
  "/update",
  checkQueryToken,
  validateBody(passwordSchema),
  updatePasswordController
);

export default authRouter;
