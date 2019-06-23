const { getUser, createUser, updateUser}  = require('./user');
const { login }  = require('./auth');
const { search }  = require('./search');
const { organization }  = require('./organization');

module.exports = {
  Query: {
    getUser,
    login, 
    search,
    organization,
  },
  Mutation: {
    createUser,
    updateUser,
  }
}
