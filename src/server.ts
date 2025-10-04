import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";

import authRouter from "./routers/auth.router";
import postRouter from "./routers/post.router";

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
  credentials: true,
};

const startServer = (): void => {
  const app: Express = express();
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static(path.resolve('images')));
  

  app.use("/api/auth", authRouter);
  app.use("/api/posts", postRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
