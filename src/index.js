const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs/index.graphql');
const resolvers = require('./resolvers');
const mongo = require('./lib/mongo');

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
