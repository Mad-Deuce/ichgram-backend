import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { IMiddleware } from "../typescript/interfaces";

import HttpError from "../typescript/classes/HttpError";

const validateSearch = (schema: ObjectSchema) => {
  const validateSearchMiddleware: IMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.validateAsync(req.query, {
        abortEarly: false,
      });
      next();
    } catch (error: any) {
      throw new HttpError(400, error.message);
    }
  };

  return validateSearchMiddleware;
};

export default validateSearch;
