import express from "express";
import cors from "cors";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";
import productRouter from "./routers/product.router";
import categoryRouter from "./routers/category.router";

const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
