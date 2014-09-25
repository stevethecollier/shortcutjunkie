var express = require('express');
var router = express.Router();

var shortcuts = require('./shortcuts');

router.use('/shortcuts', shortcuts);

module.exports = router;
