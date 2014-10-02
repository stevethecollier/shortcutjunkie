var express = require('express');
var router = express.Router();

//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var ShortcutSchema = require('../../models/Shortcut.js').ShortcutSchema;
var Shortcut = db.model('shortcut', ShortcutSchema);

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
router.get('/', function(req,res) {
	var criteriaKey = req.param('criteriaKey');
	var criteriaValue = req.param('criteriaValue');
	console.log('searching for ' + criteriaKey + ' = ' + criteriaValue);

	var criteria = {};
	criteria[criteriaKey] = criteriaValue;

	Shortcut.find(criteria, function(error, foundShortcuts){
		if(error || !foundShortcuts){
			res.json({
				error : error
			});
		} else {
			res.send({
				foundShortcuts : foundShortcuts
			})
		}

	})
})

module.exports = router;