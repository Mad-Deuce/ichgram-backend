import { Server, RemoteSocket } from "socket.io";
import { createServer } from "node:http";

import Message from "./db/models/Message";
import { getMessageById } from "./services/message.service";

import authenticateSocket from "./middlewares/authenticateWS";
import { IAuthSocket, IChat, IMessage } from "./typescript/interfaces";

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
  credentials: true,
};

const afterCreateMessage = (wsServer: Server) => {
  Message.afterCreate(async (message, options) => {
    const createdMessage: IMessage & { chat?: IChat } = await getMessageById(
      message.dataValues.id
    );
    const allSockets = await wsServer.fetchSockets();
    allSockets.forEach((socket: any) => {
      const chatId: number = Number(socket.handshake.query.chatId);
      const userId: number = Number(
        (socket as unknown as IAuthSocket).user?.id
      );

      if (
        userId === createdMessage?.chat?.member1Id ||
        userId === createdMessage?.chat?.member2Id
      ) {
        socket.emit("newMessage", createdMessage);
      }
    });
  });
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
      (socket as IAuthSocket).user
    );
  });

  afterCreateMessage(wsServer);

  const wsPort: number = Number(process.env.WS_PORT) || 5000;
  httpServer.listen(wsPort, () =>
    console.log(`--- WebSocketServer start on port ${wsPort} ---`)
  );
};

export default startWebSocketServer;
