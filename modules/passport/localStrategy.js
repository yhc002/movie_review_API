const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

const config = require('config');
const { User } = require('../../models');
const passport = require('passport');
const auth = require('../auth');
const jwt = require('../jwt');
const extractJWT = require('passport-jwt').ExtractJwt;

const JWT_SECRET = config.get('auth.jwt.secret');

module.exports = (passport) => {
  passport.use('local',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async(email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const ex_password = exUser.password;
        if(ex_password === auth.hashPassword(password, exUser.salt)){
          done(null, {
            email,
            id: exUser.id,
          })
        } else {
          done(null, false, 'Wrong Password');
        }
      } else {
        done(null, false, 'Account not found');
      }
    } catch (error) {
      console.log('passport local error: ', error);
      done(error);
    }
  }));

  passport.use('JWT', new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  }, async (jwtUser, done) => {
    console.log('use passport jwt')
    try {
      const exUser = await User.findOne({ where: { email: jwtUser.email } });
      if (exUser) {
        done(null, jwtUser);
      } else {
        done(null, false, 'Account not found');
      }
    } catch (error) {
      console.log('passport token error: ', error);
      done(error);
    }
  }));
};