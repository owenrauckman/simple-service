const { getUser, createUser, updateUser, deleteUser }  = require('./user');
const { login }  = require('./auth');
const { search }  = require('./search');
const { getOrganization }  = require('./organization');

module.exports = {
  Query: {
    getUser,
    login,
    search,
    getOrganization,
    deleteUser,
  },
  Mutation: {
    createUser,
    updateUser,
  }
}
