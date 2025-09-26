import { Request, Response } from "express";

import { getAllRoles } from "../services/roles.service";

export const getRolesController = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  res.status(201).json(roles);
};
