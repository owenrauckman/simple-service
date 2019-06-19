const { user, createUser }  = require('./user');
const { search }  = require('./search');
const { organization }  = require('./organization');

module.exports = {
  Query: {
    user,
    search,
    organization,
  },
  Mutation: {
    createUser,
  }
}
