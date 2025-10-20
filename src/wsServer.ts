import { Server } from "socket.io";
import { createServer } from "node:http";

import Message from "./db/models/Message";
import { getMessageById } from "./services/message.service";

import authenticateSocket from "./middlewares/authenticateWS";
import { IAuthSocket } from "./typescript/interfaces";

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
  credentials: true,
};

const startWebSocketServer = () => {
  const httpServer = createServer();
  const wsServer = new Server(httpServer, {
    cors: {
      ...corsOptions,
    },
  });
  wsServer.use(authenticateSocket);

  wsServer.on("connection", (socket) => {
    console.log(
      "--- new frontend connected with user: ",
      (socket as IAuthSocket).user.toJSON()
    );
    // const chatId = socket.handshake.query.chatId;
    // console.log("chatId:", chatId);
    // console.log("socket: ", socket);
  });

  Message.afterCreate(async (message, options) => {
    console.log("hook message create: ", message.dataValues);
    const createdMessage = await getMessageById(message.dataValues.id);
    // console.log("hook message create options: ", options);
    // wsServer.emit("newMessage")
    const allSockets = await wsServer.fetchSockets();
    allSockets.forEach((socket) => {
      const chatId: number = Number(socket.handshake.query.chatId);
      if (chatId === message.dataValues.chatId) {
        socket.emit("newMessage", createdMessage);
        console.log("----------emit--------");
        console.log("socket: ", socket.id);
      }
    });
  });

  const wsPort: number = Number(process.env.WS_PORT) || 5000;
  httpServer.listen(wsPort, () =>
    console.log(`--- WebSocketServer start on port ${wsPort} ---`)
  );
};

export default startWebSocketServer;
