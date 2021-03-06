const express = require('express');
const router = express.Router();

const admin = require('./admin');
const auth = require('./auth');
const movie = require('./movie');

router.use('/admin', admin);
router.use('/auth', auth);
router.use('/movie', movie);

module.exports = router;