var express = require('express');
var router = express.Router();

var ShortcutSchema = require('../../models/Shortcut.js').ShortcutSchema;

var shortcutDAO = require('../dao/shortcutDAO.js');

/* GET initial values for all search possibilities */
router.get('/initial', function(req, res) {
    var searchChoices = [];
    for (var path in ShortcutSchema.paths) {
        searchChoices.push({
            name: path
        });
    }
    res.send({
        searchChoices: searchChoices
    });
});

/* GET search values based on the passed in criteria */
router.get('/', function(req, res) {
    var criteriaKey = req.param('criteriaKey');
    var criteriaValue = req.param('criteriaValue');
    console.log('searching for ' + criteriaKey + ' = ' + criteriaValue);

    var criteria = {};
    criteria[criteriaKey] = criteriaValue;

    shortcutDAO.find(criteria).then(function(shortcuts) {
        res.send({
            foundShortcuts: shortcuts
        });
    });
});

module.exports = router;