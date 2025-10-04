import { Response } from "express";

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: Number(60*60*1000),
      sameSite: "lax",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(7 * 24 * 60 * 60 * 1000),
      sameSite: "lax",
    });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken").clearCookie("refreshToken");
};
