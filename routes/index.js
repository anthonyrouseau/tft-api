const express = require('express');
const router = express.Router();
const profile = require('./profile');
const matches = require('./matches');

router.use('/profile', profile);
router.use('/matches', matches);

module.exports = router;