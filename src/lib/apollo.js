const { ApolloServer} = require('apollo-server-express');
const { passportAuthenticate } = require('../lib/passport');

const typeDefs = require('../typeDefs/index.graphql');
const resolvers = require('../resolvers');

module.exports = (app) =>{
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user
    }),
    introspection: true,
    playground: true,
  });


  app.use('/graphql', (req, res, next) => {
    passportAuthenticate(req, res, next);
  })

  /// merge express and apollo
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

}
