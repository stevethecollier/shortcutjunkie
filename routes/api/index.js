var express = require('express');
var router = express.Router();

var search = require('./search');
var shortcuts = require('./shortcuts');

router.use('/search', search);
router.use('/shortcuts', shortcuts);

module.exports = router;
