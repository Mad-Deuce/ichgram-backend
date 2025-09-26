import "dotenv/config";
import startServer from "./server";
import connectDatabase from "./db/connectDatabase";

const bootstrap = async (): Promise<void> => {
  await connectDatabase();
  startServer();
};

bootstrap();
