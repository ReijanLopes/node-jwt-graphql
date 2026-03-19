import { createSchema } from "graphql-yoga";
import { userTypeDefs } from "./typeDefs/userTypeDefs";
import { resolvers } from "./resolvers/userResolver";

export type GraphQLContext = {
  token: string | null;
};

export const schema = createSchema<GraphQLContext>({
  typeDefs: [userTypeDefs],
  resolvers: [resolvers],
});