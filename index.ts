import { PrismaClient } from "@prisma/client";

import fastify from "fastify";

import fastifyCors from "fastify-cors";
import fastifySwagger from "fastify-swagger";

import UserController from "./controller/user";

// NOTE
// Configure fastify instance
const app = fastify({
  logger: {
    prettyPrint: true,
    level: "debug",
  },
});

const registerPlugins = async () => {
  // NOTE
  // Create and connect prisma to the database notice that
  // there's not url to the database, as all of the configuration
  // for it are already configured in .env file
  const prisma = new PrismaClient();
  await prisma.$connect();

  // NOTE
  // Decorate fastify means we will add attribute "prisma"
  // with the type of PrismaClient to fastify instance
  app.decorate("prisma", prisma);

  // NOTE
  // Add CORS Plugin to make sure browser will accept the connection
  // from fastify as it is allowing all connection from any addresses
  // if you want to know more about CORS https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  await app.register(fastifyCors, {
    origin: "*",
  });

  // NOTE
  // This plugin will make out route definition we will make later into a
  // beautiful OpenAPI standard documentation
  await app.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Tutorial API",
        version: "1.0.0",
      },
      tags: [
        { name: "User", description: "User APIs" },
        { name: "Task", description: "Task APIs" },
      ],
    },
  });

  await app.register(UserController, { prefix: "/user" });
};

// NOTE
// This part of the code are for Typescript typing
// the purpose of this part of code are to just make sure
// typescript can infer the right type of attribute inside
// fastify instance
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

// NOTE
// Run all of the plugin registration and start fastify
registerPlugins().then(() => {
  app.listen(3000);
});
