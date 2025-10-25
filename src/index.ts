// import "dotenv/config";
require("dotenv/config");
import { startServer } from "./server";
import connectDatabase from "./db/connectDatabase";
import startWebSocketServer from "./wsServer";

const bootstrap = async (): Promise<void> => {
  await connectDatabase();
  startServer();
  startWebSocketServer();
};

bootstrap();
