const express = require('express');
const router = express.Router();

const auth = require('./auth');
const movie = require('./movie');

router.use('/auth', auth);
//router.use('/movie', movie);

module.exports = router;