//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var User = require('../../models/User.js').User(db);

var q = require('q');

exports.save = function(user) {
    var deffered = q.defer();
    User.find({
        user_id: user.user_id
    }, function(error, usersFound) {
        if (usersFound.length == 0) {
            var newUser = new User({});
            newUser.user_id = user.user_id;
            newUser.votes = [];
            newUser.save(function(error, newUser) {
                if (error || !newUser) {
                    deffered.reject(error);
                } else {
                    deffered.resolve(newUser);
                }
            });
        } else {
            deffered.reject({
                error: 'user already exists'
            })
        }
    })
    return deffered.promise;
}

exports.findAll = function() {
    var deffered = q.defer();
    User.find({})
        .exec(function(error, users) {
            if (error) {
                console.log('error inside voteDAO when trying to find');
                deffered.reject(error);
            } else {
                deffered.resolve(users);
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