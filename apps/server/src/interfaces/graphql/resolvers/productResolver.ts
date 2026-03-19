import { GraphQLContext } from "../schema";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
};

const products: Product[] = [];

export const productResolvers = {
  Query: {
    products: () => {
      return products;
    },

    product: (_: unknown, args: { id: string }) => {
      return products.find((p) => p.id === args.id) || null;
    },
  },

  Mutation: {
    createProduct: (
      _: unknown,
      args: { name: string; description?: string; price: number },
      _ctx: GraphQLContext
    ) => {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        name: args.name,
        description: args.description,
        price: args.price,
        createdAt: new Date().toISOString(),
      };

      products.push(newProduct);

      return newProduct;
    },

    updateProduct: (
      _: unknown,
      args: { id: string; name?: string; description?: string; price?: number }
    ) => {
      const product = products.find((p) => p.id === args.id);
      if (!product) throw new Error("Product not found");

      if (args.name !== undefined) product.name = args.name;
      if (args.description !== undefined) product.description = args.description;
      if (args.price !== undefined) product.price = args.price;

      return product;
    },

    deleteProduct: (_: unknown, args: { id: string }) => {
      const index = products.findIndex((p) => p.id === args.id);
      if (index === -1) return false;

      products.splice(index, 1);
      return true;
    },
  },
};