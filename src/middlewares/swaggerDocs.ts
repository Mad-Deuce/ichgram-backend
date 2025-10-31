import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../utils/swaggerSpec";

const swaggerDocs = [...swaggerUI.serve, swaggerUI.setup(swaggerSpec)];

export default swaggerDocs;
