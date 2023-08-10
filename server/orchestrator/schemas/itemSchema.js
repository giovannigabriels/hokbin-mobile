const axios = require("axios");
const redis = require("../config/redis");
const baseUrlApp = "http://localhost:4002";
const baseUrlUser = "http://localhost:4001";

const typeDefs = `#graphql
type Items {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    isRecommended: Boolean
    authorId: Int
    categoryId: Int
    userMongoId: String
    Ingredients: [ingredient]
    Category: category
 
}

type user {
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
}

type Item {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    isRecommended: Boolean
    authorId: Int
    categoryId: Int
    userMongoId: String
    Ingredients: [ingredient]
    Category: category
    User: user
}

type Item2 {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    isRecommended: Boolean
    authorId: Int
    categoryId: Int
    userMongoId: String
}



type category{
    name: String
}
type ingredient{
    name: String
  }

input ItemInput {
    name: String
    description: String
    price: Int
    imgUrl: String
    categoryId: Int
    userMongoId: String
    ingredients1: String
    ingredients2: String
    ingredients3: String
    ingredients4: String
    ingredients5: String
}

input InputEditItem{
    name: String
    description: String
    price: Int
    imgUrl: String
    categoryId: Int
    isRecommended: Boolean
}

type message {
    message: String
}

type Query {
    getItems:[Items]
    getOneItem(id:ID): Item
}

type Mutation {
    addItem (newItem: ItemInput ): Item2
    deleteItem(id:ID): message
    updateItem(id:ID, editItem: InputEditItem): message
}
`;

const resolvers = {
  Query: {
    getItems: async () => {
      try {
        const itemsCache = await redis.get("app:items");
        if (itemsCache) {
          return JSON.parse(itemsCache);
        }
        const { data } = await axios.get(`${baseUrlApp}/items`);
        await redis.set("app:items", JSON.stringify(data));
        return data;
      } catch (error) {
        return error;
      }
    },
    getOneItem: async (_, args) => {
      try {
        const { id } = args;
        const itemCache = await redis.get(`app:item:${id}`);
        if (itemCache) {
          return JSON.parse(itemCache);
        }
        const { data } = await axios.get(`${baseUrlApp}/items/${id}`);
        const { data: user } = await axios({
          method: "get",
          url: `${baseUrlUser}/users/${data.userMongoId}`,
        });

        data.User = user;
        await redis.set(`app:item:${id}`, JSON.stringify(data));
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addItem: async (_, args) => {
      try {
        const { newItem } = args;
        const { data } = await axios({
          method: "post",
          url: `${baseUrlApp}/items`,
          data: newItem,
        });
        await redis.del("app:items");
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteItem: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "delete",
          url: `${baseUrlApp}/items/${id}`,
        });
        await redis.del("app:items");
        await redis.del(`app:item:${id}`);
        return data;
      } catch (error) {
        return error;
      }
    },
    updateItem: async (_, args) => {
      try {
        const { id, editItem } = args;
        const { data } = await axios({
          method: "put",
          url: `${baseUrlApp}/items/${id}`,
          data: editItem,
        });
        await redis.del("app:items");
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
