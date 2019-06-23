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

const passportInit = () =>{
  passport.use(strategy)
  passport.initialize()
}

const passportAuthenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = { passportInit, passportAuthenticate, hashPassword }
