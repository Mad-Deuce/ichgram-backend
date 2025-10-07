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
  avatar: string;
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
  image: string;
  comments?: IComment[];
  totalComments?: number;
  likes?: ILike[];
  totalLikes?: number;
  isLiked?: boolean;
}

export interface IComment {
  id: number;
  userId: number;
  postId: number;
  text: string;
}

export interface ILike {
  id: number;
  userId: number;
  postId: number;
}

// export interface IPostResponse extends IPost{
//   comments?: IComment[];
//   totalComments?: number;
//   totalLikes?: number;
//   isLiked?: boolean;
// }

export interface IFollower {
  id: number;
  followerUserId: number;
  targetUserId: number;
}


export interface INotification {
  id: number;
  authorId: number;
  type: NotificationTypes;
  userId: number;
  postId: number;
}
