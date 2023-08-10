if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const itemSchema = require("./schemas/itemSchema");
const userSchema = require("./schemas/userSchema");

const server = new ApolloServer({
  typeDefs: [itemSchema.typeDefs, userSchema.typeDefs],
  resolvers: [itemSchema.resolvers, userSchema.resolvers],
  introspection: true,
  playground: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
