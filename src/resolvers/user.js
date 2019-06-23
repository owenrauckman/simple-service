const { AuthenticationError } = require('apollo-server-express');
const { hashPassword } = require('../lib/passport');
const User = require('../mongoose/User');
const Need = require('../mongoose/Need');
const Ability = require('../mongoose/Ability');

/**
 * Get a user's profile information and populate refs
 * @param {string} username - username we are retrieving
 */
const getUser = async (_, {username}) => {
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
    // todo: notify user which of these already exists
    const userExists = await User.countDocuments({
      $or: [
        { username: input.username },
        { email: input.email },
      ]
    });

    if(userExists > 0) return { success: false, message: 'User Exists' }

    input.password = await hashPassword(input.password);
    await User.create(input);

    return { success: true, message: `user ${input.username} successfully created` }
  } catch(e){
    console.log(e);
    return { success: false, message: 'Something went wrong' }
  }
}

/**
 * Update a user's profile information
 * If password is in the payload, hash it first
 * If the username or email already exists, fail the request since they are unique (also prevents from cross-user saves)
 * @param {object} input - user data following the the UserInput typeDef
 * @param {object} context - context we are authenticating with
 */
const updateUser = async(_, {input}, context) =>{
  if(!context.user){
    throw new AuthenticationError('Unauthorized')
  }
  try{
    // Don't allow empty username, email, or password
    if(input.hasOwnProperty('username') && input.username === '') return { success: false, message: `Username cannot be empty` };
    if(input.hasOwnProperty('email') && input.email === '') return { success: false, message: `Email cannot be empty` };
    if(input.hasOwnProperty('password') && input.password === '') return { success: false, message: `Password cannot be empty` };

    // If password is being updated, hash it before update
    if(input.password) input.password = await hashPassword(input.password);

    /*
      Don't allow users to create accounts with emails/usernames that are already registered
    */
    if(input.email && input.email !== context.user.email){
      const userExists = await User.countDocuments({ email: input.email });
      if(userExists){
        return { success: false, message: `There is already an account registered with: ${input.email}` }
      }
    }

    if(input.username && input.username !== context.user.username){
      const userExists = await User.countDocuments({ username: input.username });
      if(userExists){
        return { success: false, message: `There is a user with the username: ${input.username }. Please choose a different one.` }
      }
    }
    await User.updateOne({ username: context.user.username }, input);

    return { success: true, message: `user ${input.username} successfully updated` }
  } catch(e){
    console.log(e);
    return { success: false, message: 'Something went wrong' }
  }
}


module.exports = { getUser, createUser, updateUser };
