var express = require('express');
var router = express.Router();

//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var User = require('../../models/User.js').User(db);
var Shortcut = require('../../models/Shortcut.js').Shortcut(db);
var Vote = require('../../models/Vote.js').Vote(db);

/* GET all vote listings. */
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

/* POST new vote. listing */
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

/* PUT update vote listing. */
router.put('/', function(req, res) {
    var requestVote = req.body;
    Vote.findOne({
        _id: requestVote._id
    }, function(error, vote) {
        if (error || !vote) {
            res.json({
                error: error
            });
        } else {
            vote.user = requestVote.user;
            vote.shortcut = requestVote.shortcut;
            vote.direction = requestVote.direction;
            vote.save(function(error, vote) {
                if (error || !vote) {
                    res.json({
                        error: error
                    });
                } else {
                    res.send(vote);
                }
            });
        }
    })
});

/* DELETE vote listing. */
router.delete('/', function(req, res) {
    Vote.findOne({
        _id: req.param('id')
    }, function(error, vote) {
        console.log('in delete function');
        if (error || !vote) {
            res.json({
                error: error
            });
        } else {
            vote.remove(function(error, vote) {
                if (error || !vote) {
                    res.json({
                        error: error
                    });
                } else {
                    //TODO add a message for successfully deleting the vote 
                    res.send('successfully deleted vote');
                }
            });
        }
    })
});
module.exports = router;