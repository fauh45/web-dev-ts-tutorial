import { FastifyPluginAsync } from "fastify";
import { GetUserParams, GetUserResponse } from "./user.routedef";

/*
    User Controller

    Prefix "/user"
*/
const UserController: FastifyPluginAsync = async (app, opts) => {
  // NOTE
  // In the <{ ... }> part of the code is defining the typescript types,
  // to see the official example to use typescript type on a route see
  // https://github.com/fastify/fastify/blob/main/examples/typescript-server.ts
  // But here we will use typescript type defined in the route definition file
  app.get<{ Params: GetUserParams; Reply: GetUserResponse | string }>(
    "/:user_id",
    {
      // NOTE
      // Here we can define the shcmea of the route GET /:user_id as we defined
      // in the file user.routedef.ts
      schema: {
        // NOTE
        // Description and tags are part of the documentation
        // it will be used by the fastify-swagger plugin as seen in
        // index.ts to create a documentation
        description: "Get User by its user id",
        tags: ["User"],
        params: GetUserParams,
        response: {
          200: GetUserResponse,
        },
      },
    },
    async (req, res) => {
      /** ------------------ **/
      /** IMPLEMENT IT HERE! **/
      /** ------------------ **/
    }
  );

  return;
};

export default UserController;
