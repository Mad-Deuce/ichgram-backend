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
} from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post("/signup", validateBody(signupSchema), signupController);
authRouter.get("/verify", checkQueryToken, emailConfirmController);

authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.get("/refresh", refreshController);

authRouter.post("/reset", validateBody(emailSchema), resetPasswordController);
authRouter.put(
  "/update",
  checkQueryToken,
  validateBody(passwordSchema),
  updatePasswordController
);

// authRouter.get("/logout", authenticate, logoutController);

// authRouter.post(
//   "/reset-password",
//   checkConfirmationByEmail,
//   validateBody(passwordSchema),
//   confirmResetPasswordController
// );

export default authRouter;
