import { gql } from "@apollo/client";

export const QUERY_INVENTION = gql`
query Query {
  inventions {
    _id
    name
    description
    image
    inventory
    price
  }
}
`;

export const QUERY_DETAILS = gql`
query Query($id: ID!) {
  invention(_id: $id) {
    _id
    name
    description
    image
    inventory
    price
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($inventions: [ID]!) {
    checkout(inventions: $inventions) {
      session
    }
  }
`;


export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      history {
        _id
        purchaseDate
        inventions {
          _id
          name
          description
          image
          price
          inventory
        }
      }
    }
  }
`;
