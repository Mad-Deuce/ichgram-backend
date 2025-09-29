import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";
import authenticate from "./middlewares/authenticate";

import authRouter from "./routers/auth.router";

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
  credentials: true,
};

const startServer = (): void => {
  const app: Express = express();
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.get("/api/", authenticate, (req, res, next)=>{ res.json({ message: "Tokens successfully updated"})});

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
