import { Request, Response, NextFunction } from "express";

import User from "../db/models/User";

export interface IAuthRequest extends Request {
  user: User;
}

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IHttpError extends Error {
    status: number;
}