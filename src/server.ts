import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";

import authRouter from "./routers/auth.router";
import postRouter from "./routers/post.router";
import commentRouter from "./routers/comment.router";
import likeRouter from "./routers/like.router";
import followRouter from "./routers/follow.router";
import notificationRouter from "./routers/notification.router";
import userRouter from "./routers/users.router";
import chatRouter from "./routers/chat.router";
import messageRouter from "./routers/message.router";
import swaggerDocs from "./middlewares/swaggerDocs";

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
  credentials: true,
};

const app: Express = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve("images")));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/follows", followRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.use("/docs", swaggerDocs);


app.use(notFoundHandler);
app.use(errorHandler);

export const startServer = (): void => {
  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`--- Server start on port ${port} ---`);
  });
};

export default app;
