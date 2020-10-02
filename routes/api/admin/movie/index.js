const express = require('express');
const router = express.Router();
const passport = require('passport');
const movie = require('./movie');
const auth = require('../../../middleware');


router.post('/', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAdmin,    
    movie.postMovie
);

module.exports = router;