import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

import HttpError from "../utils/HttpError";

import User from "../db/models/User";

const { JWT_SECRET = "secret" } = process.env;

const checkConfirmationByEmail = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const token: any = req.query.token;
    if (!token) throw new HttpError(401, "Token not found");

    const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
    let email: string;
    if (typeof decoded === "object" && "email" in decoded) {
      email = decoded.email;
    } else {
      throw new HttpError(401, "Invalid token payload");
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    if (!req.auth) req.auth = {};
    req.auth.user = user;
    next();
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export default checkConfirmationByEmail;
