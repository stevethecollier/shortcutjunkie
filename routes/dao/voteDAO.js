//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var User = require('../../models/User.js').User(db);
var Shortcut = require('../../models/Shortcut.js').Shortcut(db);
var Vote = require('../../models/Vote.js').Vote(db);

var q = require('q');

exports.save = function(vote) {
    var deffered = q.defer();
    var newVote = new Vote(vote);
    newVote.save(function(error, newVote) {
        if (error || !newVote) {
            console.log('error inside voteDAO when trying to save');
            console.log(error);
            deffered.reject(error);
        } else {
            console.log('saved new vote');
            deffered.resolve(newVote);
        }
    });
    return deffered.promise;
}

exports.findAll = function() {
    var deffered = q.defer();
    Vote.find({})
        .populate('user')
        .populate('shortcut')
        .exec(function(error, votes) {
            if (error) {
                console.log('error inside voteDAO when trying to find');
                deffered.reject(error);
            } else {
                deffered.resolve(votes);
            }
        });
    return deffered.promise;
}

exports.update = function(inputVote) {
    var deffered = q.defer();
    Vote.findOne({
        _id: inputVote._id
    }, function(error, vote) {
        if (error || !vote) {
            console.log('did not find a vote');
            deffered.reject(error);
        } else {
            vote.user = inputVote.user;
            vote.shortcut = inputVote.shortcut;
            vote.direction = inputVote.direction;
            vote.save(function(error, vote) {
                if (error || !vote) {
                    deffered.reject(error);
                } else {
                    deffered.resolve(vote);
                }
            });
        }
    });
    return deffered.promise;
}

exports.delete = function(id) {
    var deffered = q.defer();
    Vote.findOne({
        _id: id
    }, function(error, vote) {
        if (error || !vote) {
            res.json({
                error: error
            });
        } else {
            vote.remove(function(error, vote) {
                if (error || !vote) {
                    deffered.reject(error);
                } else {
                    deffered.resolve(vote);
                }
            });
        }
    });
    return deffered.promise;
}