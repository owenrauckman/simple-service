const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const User = require('../mongoose/User');

const { Strategy, ExtractJwt } = passportJWT;

const strategyParams = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(strategyParams, async (payload, done) => {
  try{
    const user = await User.findOne({username: payload.username});
    return done(null, user)
  } catch(e){
    console.log(e)
    return {error: e}
  }
})

/**
 * Instantiate passport using the strategy defined above. This middleware gets
 * applied in apollo.js and ensures that we can do auth on certain graphQL queries
 */
const passportInit = () =>{
  passport.use(strategy)
  passport.initialize()
}

/**
 * Actual authentication middleware that gets fired on each route under /graphql
 * @param {object} req - express req object
 * @param {object} res - express res object
 * @param {object} next - express next object
 */
const passportAuthenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
}

/**
 * Use bcrypt to has a password with 10 salt rounds before storing in our DB
 * @param {string} password - Password we are hasing
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = { passportInit, passportAuthenticate, hashPassword }
