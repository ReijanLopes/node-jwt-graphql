export const productTypeDefs = /* GraphQL */ `
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    createdAt: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(
      name: String!
      description: String
      price: Float!
    ): Product!

    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
    ): Product!

    deleteProduct(id: ID!): Boolean!
  }
`;