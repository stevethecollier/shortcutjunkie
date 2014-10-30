var express = require('express');
var router = express.Router();

var search = require('./search');
var shortcuts = require('./shortcuts');
var users = require('./users');

router.use('/search', search);
router.use('/shortcuts', shortcuts);
router.use('/users', users);

module.exports = router;
