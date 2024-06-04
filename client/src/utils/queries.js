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

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

// export const QUERY_ALL_PRODUCTS = gql`
//   {
//     products {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

export const QUERY_USER = gql`
query Query {
  users {
    _id
    firstName
    lastName
    email
    history {
      _id
      purchaseDate
      inventions {
        _id
        name
        description
        image
        inventory
        price
      }
    }
  }
}
`;
