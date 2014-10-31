var express = require('express');
var router = express.Router();

//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var User = require('../../models/User.js').User(db);
var Shortcut = require('../../models/Shortcut.js').Shortcut(db);
var Vote = require('../../models/Vote.js').Vote(db);

/* GET all shortcut listings. */
router.get('/', function(req, res) {
    Vote.find({})
        .populate('user')
        .populate('shortcut')
        .exec(function(error, votes) {
            res.send({
                votes: votes
            });
        });
});

/* POST new shortcut. listing */
router.post('/', function(req, res) {
    var newVote = new Vote(req.body);
    newVote.save(function(error, newVote) {
        if (error || !newVote) {
            res.json({
                error: error
            });
        } else {
            res.send(newVote);
        }
    });
});

/* PUT update shortcut listing. */
/*router.put('/', function(req, res) {
    var requestShortcut = req.body;
    Shortcut.findOne({
        _id: requestShortcut._id
    }, function(error, shortcut) {
        if (error || !shortcut) {
            res.json({
                error: error
            });
        } else {
            shortcut.application = requestShortcut.application,
            shortcut.operatingSystem = requestShortcut.operatingSystem,
            shortcut.keyset = requestShortcut.keyset,
            shortcut.description = requestShortcut.description
            shortcut.save(function(error, shortcut) {
                if (error || !shortcut) {
                    res.json({
                        error: error
                    });
                } else {
                    res.send(shortcut);
                }
            });
        }
    })
});*/

/* DELETE shortcut listing. */
/*router.delete('/', function(req, res) {
    var requestShortcut = req.body;
    Shortcut.findOne({
        _id: req.param('id')
    }, function(error, shortcut) {
        if (error || !shortcut) {
            res.json({
                error: error
            });
        } else {
            shortcut.remove(function(error, shortcut) {
                if (error || !shortcut) {
                    res.json({
                        error: error
                    });
                } else {
                    //TODO add a message for successfully deleting the shortcut 
                    res.send('successfully deleted shortcut');
                }
            })
        }
    })
});*/
module.exports = router;