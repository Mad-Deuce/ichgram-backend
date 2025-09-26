import { Request, Response } from "express";

import { getAllSessions } from "../services/sessions.service";

export const getSessionsController = async (req: Request, res: Response) => {
  const sessions = await getAllSessions();
  res.status(201).json(sessions);
};
