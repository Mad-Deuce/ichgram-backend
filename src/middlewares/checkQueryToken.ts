import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import HttpError from "../typescript/classes/HttpError";

import User from "../db/models/User";
import { IAuthRequest, IMiddleware } from "../typescript/interfaces";

const { JWT_SECRET = "secret" } = process.env;

const checkQueryToken: IMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = String(req.query.token);
    if (!token) throw new HttpError(401, "Token not found");

    const decoded: JwtPayload | string = jwt.verify(token, JWT_SECRET);

    let email: string | undefined;
    if (typeof decoded === "object" && "email" in decoded) {
      email = (decoded as JwtPayload).email as string | undefined;
    }
    if (!email) throw new HttpError(401, "Token not valid");

    const user: User | null = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    (req as IAuthRequest).user = user;
    next();
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export default checkQueryToken;
