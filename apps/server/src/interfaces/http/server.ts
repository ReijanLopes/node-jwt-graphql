import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "../graphql/schema";
import { buildAuthContext } from "@domain/auth/middlewares/authMiddleware";

export function createServer() {
  const app = express();

  app.use(express.json());

  const yoga = createYoga({
    schema,
    graphqlEndpoint: "/graphql",
    context: ({ request }) => {
      // converte o Request do Yoga para o formato que o buildAuthContext espera
      const authorization = request.headers.get("authorization") ?? undefined;

      const authContext = buildAuthContext({
        headers: { authorization },
      } as any);

      return {
        ...authContext, // { userId, role }
      };
    },
  });

  app.use("/graphql", yoga);

  return app;
}