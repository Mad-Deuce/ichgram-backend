import { Socket, ExtendedError } from "socket.io";
import { serialize, parse } from "cookie";
import jwt from "jsonwebtoken";

import { IAuthRequest, IAuthSocket } from "../typescript/interfaces";

import HttpError from "../typescript/classes/HttpError";

import Session from "../db/models/Session";
import User from "../db/models/User";

const { JWT_SECRET = "secret" } = process.env;

const authenticateSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
): Promise<void> => {
  const cookies: any = parse(socket.handshake.headers.cookie || "");
  const accessToken: string | undefined = cookies.accessToken;

  if (!accessToken)
    return next(new HttpError(401, "AccessToken not found in socket"));

  try {
    jwt.verify(accessToken, JWT_SECRET);
  } catch (error) {
    next(new HttpError(401, "AccessToken in socket verification failed"));
  }

  const session: (Session & { user?: User }) | null = await Session.findOne({
    where: { accessToken: accessToken },
    include: { model: User, as: "user" },
  });
  if (!session) return next(new HttpError(401, "Session not found"));

  const user: User | undefined = session.user;
  if (!user) return next(new HttpError(401, "User not found"));
  (socket as IAuthSocket).user = user;

  next();
};

export default authenticateSocket;
