import { Request, Response, NextFunction } from "express";

import Roles from "../constants/Roles";
import NotificationTypes from "../constants/NotificationTypes";
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

export interface IPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  image: string;
}

export interface INotification {
  id: number;
  authorId: number;
  type: NotificationTypes;
  userId: number;
  postId: number;
}