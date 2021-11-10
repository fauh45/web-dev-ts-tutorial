import { Static, Type } from "@sinclair/typebox";

/*
    User Controller Route Definition

    Prefix "/user"
*/

// NOTE
// This definition of a User should always be the same as
// in the schema (open up schema.prisma at "/prisma/schema.prisma").
// In the schema you can see that User model and this model have differences
// that there are no Task, it is because that one is just the connection to
// the task. And this User constant will have the JSON Schema we will use in
// fastify route later
export const User = Type.Object({
  user_id: Type.Integer(),
  first_name: Type.String({ minLength: 1, maxLength: 50 }),
  last_name: Type.String({ minLength: 1, maxLength: 50 }),
});

// NOTE
// This part will have the same name as constant User, but this one have
// type of "type", that shows that this User is just a Typescript type to
// help us later
export type User = Static<typeof User>;

/* GET /:user_id */
export const GetUserParams = Type.Object({
  user_id: Type.Integer(),
});
export type GetUserParams = Static<typeof GetUserParams>;

// NOTE
// Notice that code above have the same pattern as the User definition, but this
// time it is defining the type of url paramters of GET /:user_id. The parameter
// part of the url itself are the "user_id", and it will have type of integer

export const GetUserResponse = User;
export type GetUserResponse = User;
