import { Request, Response, NextFunction } from "express";

import HttpError from "../typescript/classes/HttpError";
import { IAuthRequest } from "../typescript/interfaces";

const checkRole = (roles: string[]) => {
  const checkRolesMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const role: string = (req as IAuthRequest).user.get("role") as string;
    if (!role) throw new HttpError(403, "Role not found");
    if (!roles.includes(role)) throw new HttpError(403, "Access Denied");
    next();
  };

  return checkRolesMiddleware;
};

export default checkRole;
