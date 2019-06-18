const { user }  = require('./user');
const { search }  = require('./search');
const { organization }  = require('./organization');

module.exports = {
  Query: {
    user,
    search,
    organization,
  },
  // Mutation: {
  //   todo: fill with exports from resolver files
  // }
}
