import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";
import { version, name, license, description } from "../../package.json";

const routersPath = path.resolve("src", "routers", "*");
const schemasPath = path.resolve("src", "validation", "schemas", "*");

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: name,
      version,
      license: {
        name: license,
      },
      description,
    },
    tags: [
      { name: "Auth", description: "Auth operations" },
      { name: "User", description: "User operations" },
      { name: "Follow", description: "Operations with Follows" },
      { name: "Post", description: "Operations with Posts" },
      { name: "Comment", description: "Operations with Comments" },
      { name: "Like", description: "Operations with Likes" },
      { name: "Chat", description: "Operations with Chats" },
      { name: "Message", description: "Operations with Messages" },
      { name: "Notification", description: "Operations with Notifications" },
    ],
    schemes: [schemasPath],
  },
  apis: [routersPath, schemasPath],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
