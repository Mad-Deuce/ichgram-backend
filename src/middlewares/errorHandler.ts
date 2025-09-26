import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { JsonWebTokenError } from "jsonwebtoken";

import HttpError from "../utils/HttpError";

const errorHandler = (error: any, req: Request, res: Response, next: any) => {
  console.log(error);

  let status = error.status || 500;
  let message = error.message || "Server error";

  if (error instanceof JsonWebTokenError) {
    status = 401;
  }

  if (error instanceof ValidationError) {
    status = 400;
  }

  if (error instanceof UniqueConstraintError) {
    status = 409;
    message = error.original.message;
  }

  res.status(status).json({ message });
};

export default errorHandler;
