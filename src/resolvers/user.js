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

/**
 * Get a user's profile information and populate refs
 * @param {object} input - user data following the the UserInput typeDef 
 */
const createUser = async(_, {input}) =>{
  try{
    const userExists = await User.countDocuments({
      $or: [
        { username: input.username },
        { email: input.emailAddress },
      ]
    });

    if(userExists > 0) return { success: false, message: 'User Exists' }

    await User.create(input);
    return { success: true, message: `user ${input.username} successfully created` }
  } catch(e){
    console.log(e);
    return { success: false, message: 'Something went wrong' }
  }
}


module.exports = { user, createUser };
