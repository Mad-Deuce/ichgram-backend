import { Request, Response } from "express";

import HttpError from "../utils/HttpError";

const validateBody = (schema: any) => {
  const validateBodyMiddleware = async (
    req: Request,
    res: Response,
    next: any
  ) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error: any) {
      throw new HttpError(400, error.message);
    }
  };

  return validateBodyMiddleware;
};

export default validateBody;
