import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { IAuthRequest } from "../typescript/interfaces";

import HttpError from "../typescript/classes/HttpError";

import Session from "../db/models/Session";
import User from "../db/models/User";

const { JWT_SECRET = "secret" } = process.env;

const authenticate = async (req: Request, res: Response, next: any) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new HttpError(401, "AccessToken not found");
    jwt.verify(accessToken, JWT_SECRET);

    const session: Session | null = await Session.findOne({
      where: { accessToken: accessToken },
    });
    if (!session) throw new HttpError(401, "Session not found");

    const user: User | null = await User.findByPk(
      session.get("userId") as number
    );
    if (!user) throw new HttpError(401, "User not found");
    (req as IAuthRequest).user = user;

    next();
  } catch (error) {
    throw new HttpError(401, "Invalid token payload");
  }
};

export default authenticate;
