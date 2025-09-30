import { Request, Response, NextFunction } from "express";

import Roles from "../constants/Roles";
import User from "../db/models/User";

export interface ISession {
  userId: number;
  accessToken: string;
  refreshToken?: string;
}

export interface IUser {
  id: number;
  email: string;
  isVerified: boolean;
  password: string;
  role: Roles;
  fullname: string;
  username: string;
}

export interface IAuthRequest extends Request {
  user: User;
}

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IHttpError extends Error {
    status: number;
}