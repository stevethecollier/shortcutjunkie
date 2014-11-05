//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var Shortcut = require('../../models/Shortcut.js').Shortcut(db);

var q = require('q');

exports.save = function(inputShortcut) {
    var deffered = q.defer();

    //default 0 upvotes and downvotes
    inputShortcut.upvotes = 0;
    inputShortcut.downvotes = 0;
    newShortcut = new Shortcut(inputShortcut);
    newShortcut.save(function(error, newShortcut) {
        if (error || !newShortcut) {
            deffered.reject(error);
        } else {
            deffered.resolve(newShortcut);
        }
    })
    return deffered.promise;
};


exports.findAll = function() {
    var deffered = q.defer();
    Shortcut.find({})
        .exec(function(error, shortcuts) {
            if (error) {
                console.log('error inside voteDAO when trying to find');
                deffered.reject(error);
            } else {
                deffered.resolve(shortcuts);
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