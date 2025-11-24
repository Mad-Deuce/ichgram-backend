import { Request, Response, NextFunction } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { JsonWebTokenError } from "jsonwebtoken";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = error.status || 500;
  let message = error.message || "Server error";


  if (error instanceof JsonWebTokenError) {
    status = 401;
  }

  if (error instanceof ValidationError) {
    status = 400;
    message = error.errors.map(({ message }) => message).join();
  }


    console.log("------0----------", typeof error);

  if (error instanceof UniqueConstraintError) {
    console.log("------1----------",  error);

    status = 409;
  }

  res.status(status).json({ message });
};

export default errorHandler;
