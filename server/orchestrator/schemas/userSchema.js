const axios = require("axios");
const redis = require("../config/redis");
const baseUrlUser = "http://localhost:4001";

const typeDefs = `#graphql

type User {
    _id:String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
}
type UserRegis {
    email: String
    username: String
}
type message {
    message: String
}
input InputUser{
    username: String
    password: String
    email: String
    role: String
    phoneNumber: String
    address: String
}
type Query {
    getUsers: [User]
    getUser(id:String): User
}
type Mutation{
    addUser(newUser: InputUser): UserRegis
    deleteUser(id:String): message
}
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const usersCache = await redis.get("users:users");
        if (usersCache) {
          return JSON.parse(usersCache);
        }
        const { data } = await axios({
          method: "get",
          url: `${baseUrlUser}/users`,
        });
        await redis.set("users:users", JSON.stringify(data));
        return data;
      } catch (error) {
        return error;
      }
    },
    getUser: async (_, args) => {
      try {
        const { id } = args;
        const userCache = await redis.get(`users:user:${id}`);
        if (userCache) {
          return JSON.parse(userCache);
        }
        const { data } = await axios({
          method: "get",
          url: `${baseUrlUser}/users/${id}`,
        });
        await redis.set(`users:user:${id}`, JSON.stringify(data));
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { newUser } = args;
        const { data } = await axios({
          method: "post",
          url: `${baseUrlUser}/users`,
          data: newUser,
        });
        await redis.del("users:users");
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "delete",
          url: `${baseUrlUser}/users/${id}`,
        });
        await redis.del("users:users");
        await redis.del(`users:user:${id}`);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
