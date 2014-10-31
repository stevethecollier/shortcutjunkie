var express = require('express');
var router = express.Router();

var voteDAO = require('../dao/voteDAO.js');

/* GET all vote listings. */
router.get('/', function(req, res) {
    voteDAO.findAll().then(function(votes) {
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
    voteDAO.update(req.body).then(function(updatedVote) {
        res.send(updatedVote);
    }, function(error) {
        console.log('did not update vote');
        res.json({
            error: error
        });
    });
});

/* DELETE vote listing. */
router.delete('/', function(req, res) {
    voteDAO.delete(req.param('id')).then(function() {
        res.send('successfully deleted vote');
    }, function(error) {
        console.log('did not delete vote');
        res.json({
            error: error
        });
    });
});

module.exports = router;