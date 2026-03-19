import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "../graphql/schema";


export function createServer() {
  const app = express();

  app.use(express.json());

  const yoga = createYoga({
    schema,
    graphqlEndpoint: "/graphql",
    context: ({ request }) => {
      const token = request.headers.get("authorization");

      return {
        token,
      };
    },
  });

  app.use("/graphql", yoga);

  return app;
}