'use strict';

const express = require('express');
const cors = require('cors');

const router = express.Router();

router.use(cors());

router.get('/', function(req, res) {
	res.send('Root');
});

module.exports = router;