import { AuthContext } from "@domain/auth/middlewares/authMiddleware";

export const userResolvers = {
  Query: {
    users: async (_: unknown, __: unknown, ctx: AuthContext) => {
      if (!ctx.userId) throw new Error("Unauthenticated.");
      return [];
    },
  },

  Mutation: {
    createUser: async (_: any, args: any, ctx: AuthContext) => {
      if (!ctx.userId) throw new Error("Unauthenticated.");
      return {
        id: "1",
        name: args.name,
        email: args.email,
      };
    },
  },
};