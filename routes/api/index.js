var express = require('express');
var router = express.Router();

var search = require('./search');
var shortcuts = require('./shortcuts');
var users = require('./users');
var voting = require('./voting');

router.use('/search', search);
router.use('/shortcuts', shortcuts);
router.use('/users', users);
router.use('/voting', voting);

module.exports = router;
