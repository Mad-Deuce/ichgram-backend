import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";
import authenticate from "./middlewares/authenticate";

import authRouter from "./routers/auth.router";
import usersRouter from "./routers/users.router";
import adminRouter from "./routers/admin.router";
import checkRole from "./decorators/checkRole";

const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/admin", authenticate, checkRole(["admin"]), adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
