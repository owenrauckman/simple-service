const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema.graphql');
const resolvers = require('./resolvers');
const mongo = require('./mongo');

mongo();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
