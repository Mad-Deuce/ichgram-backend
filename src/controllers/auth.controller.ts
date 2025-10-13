import { Request, Response } from "express";

import { IAuthRequest } from "../typescript/interfaces";
import { IUser } from "../typescript/interfaces";

import { setAuthCookies, clearAuthCookies } from "../utils/setupAuthCookies";

import {
  signupUser,
  confirmEmail,
  loginUser,
  refreshTokens,
  logoutUser,
  resetPassword,
  updatePassword,
} from "../services/auth.service";

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
  const { accessToken, refreshToken } = await refreshTokens(
    req.cookies.refreshToken
  );
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "Tokens successfully updated" });
};

export const logoutController = async (req: Request, res: Response) => {
  await logoutUser((req as IAuthRequest).user);
  clearAuthCookies(res);
  res.json({ message: "Logout successfully, redirect to Login Page" });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  await resetPassword(req.body.email);
  clearAuthCookies(res);
  res.json({
    message: `Confirm reset password, a message containing a confirmation link has been sent to email: ${req.body.email}`,
  });
};

export const updatePasswordController = async (req: Request, res: Response) => {
  await updatePassword((req as IAuthRequest).user, req.body.password);
  clearAuthCookies(res);
  res.json({
    message: "Password successfully updated, redirect to Login Page",
  });
};

export const getUserController = async (req: Request, res: Response) => {
  const { id, email, fullname, username, avatar } = (req as IAuthRequest).user.toJSON();
  res.json({
    message: "Login successfully",
    user: { id, email, fullname, username, avatar },
  });
};
