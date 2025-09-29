import { Request, Response } from "express";

import { IAuthRequest } from "../typescript/interfaces";

import { setAuthCookies, clearAuthCookies } from "../utils/setupAuthCookies";

import {
  signupUser,
  confirmEmail,
  loginUser,
  refreshTokens,
  logoutUser,
  resetUserPassword,
  confirmResetPassword,
} from "../services/auth.service";
import { IUser } from "../db/models/User";

export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const email: string = await signupUser(req.body);
  res.status(201).json({
    message: `Signup successfully, a message containing a confirmation link has been sent to email: ${email}`,
  });
};

export const emailConfirmController = async (
  req: Request,
  res: Response
): Promise<void> => {
  await confirmEmail((req as IAuthRequest).user);
  res.json({ message: "Email successfully confirmed" });
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password }: IUser = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "Login successfully", user });
};

export const refreshController = async (req: Request, res: Response) => {
  // const { user, accessToken, refreshToken } = await refreshTokens(
  //   req.cookies.refreshToken
  // );
  // setAuthCookies(res, accessToken, refreshToken);
  // res.json({ message: "Tokens successfully updated", user });
};

export const logoutController = async (req: Request, res: Response) => {
  await logoutUser(req.auth.user.id);
  clearAuthCookies(res);
  res.json({ message: "Logout successfully, redirect to Login Page" });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  await resetUserPassword(req.query.email);
  clearAuthCookies(res);
  res.json({
    message: `Confirm reset password, a message containing a confirmation link has been sent to email: ${req.query.email}`,
  });
};

export const confirmResetPasswordController = async (
  req: Request,
  res: Response
) => {
  await confirmResetPassword(req.auth.user, req.body.password);
  clearAuthCookies(res);
  res.json({
    message: "Password successfully updated, redirect to Login Page",
  });
};
