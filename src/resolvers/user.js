const User = require('../mongoose/User');
const Need = require('../mongoose/Need');
const Ability = require('../mongoose/Ability');

/**
 * Get a user's profile information and populate refs
 * @param {string} username - username we are retrieving
 */
const user = async (_, {username}) => {
  try{
    return await User.find({username})
      .populate({ path: 'needs', model: Need})
      .populate({ path: 'abilities', model: Ability})
  } catch(e){
    console.log(e)
    return {error: e}
  }
}

module.exports = { user };
