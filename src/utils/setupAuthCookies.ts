import { Response } from "express";

const {
  ACCESS_TOKEN_MAX_AGE_MS = 900000,
  REFRESH_TOKEN_MAX_AGE_MS = 604800000,
} = process.env;

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: Number(ACCESS_TOKEN_MAX_AGE_MS),
      sameSite: "lax",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(REFRESH_TOKEN_MAX_AGE_MS),
      sameSite: "lax",
    });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken").clearCookie("refreshToken");
};
