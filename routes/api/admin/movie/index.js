const express = require('express');
const router = express.Router();
const passport = require('passport');
const movie = require('./movie');
const auth = require('../../../middleware');
const upload = require('../../../../modules/fileUploadPoster')

router.post('/', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAdmin,
    upload.single('poster'),    
    movie.postMovie
);

router.put('/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAdmin, 
    upload.single('poster'),   
    movie.updateMovie
);

router.delete('/:id', 
    passport.authenticate('JWT', { session: false }),
    auth.checkAdmin,    
    movie.deleteMovie
);

module.exports = router;