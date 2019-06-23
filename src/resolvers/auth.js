const { AuthenticationError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../mongoose/User');

/**
 * Check if a username, and valid password exists and return a signed JWT token
 * @param {object} username - user object that contains username and password for login check
 */
const login = async (_, {input}) => {
  try{
    const user = await User.findOne({ username: input.username }) // todo: email OR username (security chck though)
    if(!user) return { success: false, message: 'invalid username' }

    const validPassword = await bcrypt.compare(input.password, user.password);

    if(validPassword){
      // todo: send this as a header later and BUMP the expiry time
      console.log(jwt.sign({username: input.username}, process.env.JWT_SECRET, { expiresIn: '5m' }));
      return { success: true, message: 'login successful' }
    }

    return { success: false, message: validPassword ? 'login unsuccessful' : 'incorrect password' }

  } catch(e){
    console.log(e)
    return {success: false, message: e}
  }
}


module.exports = { login };
