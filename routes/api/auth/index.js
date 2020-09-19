const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const passport = require('passport');

const signup = require('./signup');
const login = require('./login');
const user = require('./user');
const auth = require('../../middleware');

router.post('/signup', [
  check('email').isEmail(),
  check('name').isLength({ min: 2 }),
  check('password').isLength({ min: 5 })
], signup.addUser)

router.post('/login', 
  login.auth,
  login.authResponse
);

router.get('/info',
  passport.authenticate('JWT', { session: false }),
  auth.checkAuthed,
  user.getInfo
);

module.exports = router;