const express = require('express');
const router = express.Router();
const passport = require('passport');
const movie = require('./movie');
const rating = require('./rating')
const auth = require('../../middleware');


router.get('/list',
    passport.authenticate('JWT', { session: false }),
    movie.getList
);
router.get('/:id', 
    passport.authenticate('JWT', { session: false }),
    movie.getDetail
);
router.post('/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    rating.rateMovie
);
router.put('/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    rating.updateRating
);
router.delete('/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    rating.deleteRating
);
router.get('/my_rating/list', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    rating.getMyRatings
);
router.get('/rating/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    rating.getMovieRatings
);
router.get('/rating/detail/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAuthed,    
    rating.getRatingDetail
);

module.exports = router;