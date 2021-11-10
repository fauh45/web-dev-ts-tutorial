# web-dev-ts-tutorial

Backend Typescript Tutorial using Fastify, Prisma, and PostgreSQL

## Setup

Requirement to run the tutorial are,

1. NodeJS (version >=12.9.0)
2. Yarn (version >=1.22.10)
3. Docker (version >=20.10.8)

While for the code editor the author recommends,

1. VS Code, with plugins,
2. [Prisma Plugins](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
3. [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

Then do the following command to install all the node depedencies,

```sh
yarn
```

After it all installed, follow the tutorial below,

### Database Setup

For simplicity we will use docker to start an instance of postgresql,

1. Open a terminal (or powershell in windows)
2. Pull postgres database image from docker hub

   ```sh
   docker pull postgres
   ```

3. Start create instance of postgres database using docker

   ```sh
   docker run --name testdb -e POSTGRES_USER=testdb -e POSTGRES_PASSWORD=testdb -p 5432:5432 -d postgres
   ```

   This will create an instance of postgres database with username, database, and password `testdb`.

4. Now, create `.env` file in the root of the repository, and paste this into it,

   ```
   DATABASE_URL="postgresql://testdb:testdb@localhost:5432/testdb?schema=public"
   ```

5. Do migration of the schema using the command,

   ```sh
   yarn prisma migrate
   ```

6. Create type definition of the schema using,

   ```sh
   yarn prisma migrate dev --name init
   ```

7. Now the database have been setup, follow the app setup in the next part of this README

:warning: **If you already done this part before** :warning:

To start the instance use the command below instead,

```sh
docker start testdb
```

#### Further Reading

To read more about prisma, especially how to connect prisma and postgresql go to the [postgresql connector section on their website](https://www.prisma.io/docs/concepts/database-connectors/postgresql). And to read more about their [Prisma Client](https://pris.ly/d/client).

And to know more about postgres image in docker, see their page in [docker hub](https://hub.docker.com/_/postgres).

### App Setup

To start the app it is as simple as,

```sh
yarn dev
```

This will start `ts-node` that will transpile the code from typescript to javascript, and run it using node.

## Tutorial

First of all, if you found a comment that looks like this,

```ts
// NOTE
// Bla Bla Bla Bla Bla Bla Bla Bla
// Bla Bla Bla Bla Bla Bla Bla Bla
```

That is comment from the author of this tutorial, so please do read it to understand about the code even more.

In this tutorial we will see and make a GET route of User get implemented.

### GET Route

This part of the tutorial we will see how a GET route in Fastify gets implemented with it's own route definition itself. Now what is a route definition? Route definition is a term the author used to describe a schema of a HTTP route of an API. The way it is used in fastify are route schema for all route parameters, query string, body, and response are made using JSON Schema ([read more about JSON Schema](https://json-schema.org/learn/getting-started-step-by-step)). But as it is tedious to make, we will be using a library to make us a JSON Schema programatically, and it will also make typescript definition of the JSON Schema, which is Type box ([read more about typebox](https://github.com/sinclairzx81/typebox#typebox)).

So now, open up `user.routedef.ts`, but don't close the this README file. There you can see all of the schema for all the route there is in User controller. User itself are an entity of the database, at least here. A controller does not need to be an entitiy of a database, it could be anything, but for this use case we will make it like it.

Notice that the varible have some kind of pattern, the entity will have the name as is, e.g. User. While the route definition, e.g. GetUserParameters, is different. This is intentional to make the variable clear of what it defines, so if you do make a route definition please use the template of `[Request Type (GET, POST, PUT, DELETE)][Enitity or route name][Defined Type (parameters, querystring, body, response)]`.

Now move to `user.ts`, and you will see that the implementation part of the route will be left out, use this code below to implement it,

```ts
const response = await app.prisma.user.findUnique({
  where: {
    user_id: req.params.user_id,
  },
  rejectOnNotFound: false,
});

if (response) res.code(200).send(response);

return res.code(400).send("Not Found.");
```

:warning: **Don't just copy and paste it! Try to type the code yourself!** :warning:

Now after trying to implement it, try to change

```ts
res.code(200).send(response);
```

into sending undefined data,

```ts
res.code(200).send(undefined);
```

Now the typescript linter will show that you're not supposed to send data with that kind of structure, because the data sent are already defined with the typescript type before. This will reduce the static type error in the code on our development later. So for now revert it back to the corrent one.

Now let's start the application, go to the root of the application and open up terminal/powershell. Then start it using the command `yarn dev`. Now after a while, the terminal/powershell will shows something like

```
[1636537690329] INFO (XXXX on XXXXXXXX): Server listening at http://127.0.0.1:3000
```

Follow that link provided and add `/docs` at the end to see the documentation.

That's it. The end.

#### Further Study

To further your understanding of the framework and workflow of this tutorial/template, the author challenges the reader to implement as following,

1. POST route on User to add new User
2. DELETE route on User to delete a User
3. PUT route on User to update a User
4. POST route on Task to create a new task, with its new route definition and controller for it, and don't forget to connect it with the User via its user_id

And to make it easier to see the change on the database, you could use prisma studio, just type in `yarn prisma studio` then follow the link.

## License

MIT
