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

exports.update = function(inputUser) {
    var deffered = q.defer();
    User.findOne({
        _id: inputUser._id
    }, function(error, user) {
        if (error || !user) {
            console.log('did not find a user');
            deffered.reject(error);
        } else {
            user.user_id = inputUser.user_id;
            user.votes = inputUser.votes;
            user.save(function(error, user) {
                if (error || !user) {
                    deffered.reject(error);
                } else {
                    deffered.resolve(user);
                }
            });
        }
    });
    return deffered.promise;
}

exports.delete = function(id) {
    var deffered = q.defer();
    User.findOne({
        _id: id
    }, function(error, user) {
        if (error || !user) {
            res.json({
                error: error
            });
        } else {
            user.remove(function(error, user) {
                if (error || !user) {
                    deffered.reject(error);
                } else {
                    deffered.resolve(user);
                }
            });
        }
    });
    return deffered.promise;
}