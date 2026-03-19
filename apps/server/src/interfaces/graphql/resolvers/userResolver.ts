export const resolvers = {
  Query: {
    users: async () => {
      return [];
    },
  },

  Mutation: {
    createUser: async (_: any, args: any) => {
      return {
        id: "1",
        name: args.name,
        email: args.email,
      };
    },
  },
};