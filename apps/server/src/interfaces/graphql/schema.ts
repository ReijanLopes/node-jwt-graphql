import { createSchema } from "graphql-yoga";
import { userTypeDefs } from "./typeDefs/userTypeDefs";
import { userResolvers } from "./resolvers/userResolver";
import { AuthContext } from "@domain/auth/middlewares/authMiddleware";
import { authTypeDefs } from "./typeDefs/authTypedefs";
import { authResolvers } from "./resolvers/authResolvers";

export const schema = createSchema<AuthContext>({
  typeDefs: [authTypeDefs, userTypeDefs],
  resolvers: [authResolvers, userResolvers],
});
