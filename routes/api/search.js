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

module.exports = router;