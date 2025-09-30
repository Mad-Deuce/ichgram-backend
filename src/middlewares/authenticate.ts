import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { IAuthRequest } from "../typescript/interfaces";

import HttpError from "../typescript/classes/HttpError";

import Session from "../db/models/Session";
import User from "../db/models/User";

const { JWT_SECRET = "secret" } = process.env;

const authenticate = async (req: Request, res: Response, next: any) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new HttpError(401, "AccessToken not found");

  try {
    jwt.verify(accessToken, JWT_SECRET);
  } catch (error) {
    throw new HttpError(401, "AccessToken verification failed");
  }

  const session: (Session & { user?: User }) | null = await Session.findOne({
    where: { accessToken: accessToken },
    include: { model: User, as: "user" },
  });
  if (!session) throw new HttpError(401, "Session not found");

  const user: User | undefined = session.user;
  if (!user) throw new HttpError(401, "User not found");
  (req as IAuthRequest).user = user;

  next();
};

export default authenticate;
