import { Request, Response } from "express";

import Role from "../db/models/Role";

import HttpError from "../utils/HttpError";

const checkRole = (roles: string[]) => {
  const checkRolesMiddleware = async (
    req: Request,
    res: Response,
    next: any
  ) => {
    const role = await Role.findByPk(req.auth.user.roleId);
    if (!role) throw new HttpError(403, "Role not found");
    const { name } = role.toJSON();
    if (!roles.includes(name)) throw new HttpError(403, "Access Denied");

    next();
  };

  return checkRolesMiddleware;
};

export default checkRole;
