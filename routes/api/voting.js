var express = require('express');
var router = express.Router();

var voteDAO = require('../dao/voteDAO.js');

/* GET all vote listings. */
router.get('/', function(req, res) {
    voteDAO.find().then(function(votes) {
        console.log(votes);
        res.send({
            votes: votes
        });
    });
});

/* POST new vote. listing */
router.post('/', function(req, res) {
    voteDAO.save(req.body).then(function(newVote) {
        res.send(newVote)
    })
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