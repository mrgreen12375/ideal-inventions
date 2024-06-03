const typeDefs = `

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    history: [History]
  }

  type Invention {
    _id: ID
    name: String
    description: String
    image: String
    inventory: Int
    price: Float
  }

  type History {
    _id: ID
    purchaseDate: String
    inventions: [Invention]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input InventionInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    inventory: Int
  }

  type Query {
    inventions: [Invention]
    invention(_id: ID!): Invention
    user: User
    users: [User]
    history(_id: ID!): History
    checkout(inventions: [InventionInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addInvention(name: String!, description: String!, image: String!, inventory: Int!, price: Float!): Invention
    addHistory(inventions: [ID]!): History
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateInvention(_id: ID!, inventory: Int!): Invention
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;