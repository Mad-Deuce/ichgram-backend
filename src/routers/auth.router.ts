import { Router } from "express";

import validateBody from "../decorators/validateBody";
import {
  signupSchema,
  loginSchema,
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
  confirmResetPasswordController,
} from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post("/signup", validateBody(signupSchema), signupController);
authRouter.get("/signup", checkQueryToken, emailConfirmController);

// authRouter.post("/login", validateBody(loginSchema), loginController);
// authRouter.get("/refresh", refreshController);
// authRouter.get("/logout", authenticate, logoutController);

// authRouter.get("/reset-password", resetPasswordController);
// authRouter.post(
//   "/reset-password",
//   checkConfirmationByEmail,
//   validateBody(passwordSchema),
//   confirmResetPasswordController
// );

export default authRouter;
