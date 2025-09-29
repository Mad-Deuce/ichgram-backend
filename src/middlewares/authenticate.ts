import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// import { AuthRequest } from "../typescript/interfaces";

// Extend Express Request interface to include 'auth'
declare global {
  namespace Express {
    interface Request {
      auth: { [key: string]: any };
    }
  }
}

import HttpError from "../typescript/classes/HttpError";

import Session from "../db/models/Session";
import User, { IUser } from "../db/models/User";

const { JWT_SECRET = "secret" } = process.env;

const authenticate = async (req: Request, res: Response, next: any) => {
  try {
    console.log("req.cookies: ", req.cookies);
    
    const { accessToken } = req.cookies;
    if (!accessToken) throw new HttpError(401, "AccessToken not found");
    jwt.verify(accessToken, JWT_SECRET);

    const session = await Session.findOne({
      where: { accessToken: accessToken },
      include: { model: User, as: "user" },
    });
    if (!session) throw new HttpError(401, "Session not found");
    const { user } = session as any;
    if (!user) throw new HttpError(401, "User not found");

    if (!req.auth) req.auth = {};
    req.auth.user = user;
    req.auth.session = session.toJSON();

    next();
  } catch (error) {
    console.log(error);

    throw new HttpError(401, "Invalid token payload");
  }
};

export default authenticate;
