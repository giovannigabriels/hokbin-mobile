const { gql } = require("@apollo/client");

export const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      name
      price
      description
      imgUrl
      isRecommended
      authorId
      categoryId
      userMongoId
      Ingredients {
        name
      }
      Category {
        name
      }
    }
  }
`;

export const GET_ITEM_BY_ID = gql`
  query GetItemById($getOneItemId: ID) {
    getOneItem(id: $getOneItemId) {
      id
      name
      description
      price
      imgUrl
      isRecommended
      User {
        username
      }
      Ingredients {
        name
      }
      Category {
        name
      }
    }
  }
`;
