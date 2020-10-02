const express = require('express');
const router = express.Router();
const passport = require('passport');
const movie = require('./movie');
const auth = require('../../middleware');


router.get('/list',
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,
    movie.getList
);
router.get('/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    movie.getDetail
);
router.put('/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    movie.rateMovie
);

module.exports = router;