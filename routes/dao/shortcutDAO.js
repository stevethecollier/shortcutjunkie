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

exports.update = function(inputShortcut) {
    var deffered = q.defer();
    Shortcut.findOne({
        _id: inputShortcut._id
    }, function(error, shortcut) {
        if (error || !shortcut) {
            console.log('did not find a shortcut');
            deffered.reject(error);
        } else {
            shortcut.application = inputShortcut.application;
            shortcut.operatingSystem = inputShortcut.operatingSystem;
            shortcut.keyset = inputShortcut.keyset;
            shortcut.description = inputShortcut.description;
            shortcut.upvotes = inputShortcut.upvotes;
            shortcut.downvotes = inputShortcut.downvotes;
            shortcut.save(function(error, shortcut) {
                if (error || !shortcut) {
                    console.log('error saving shortcut');
                    deffered.reject(error);
                } else {
                    console.log('saved shortcut');
                    deffered.resolve(shortcut);
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