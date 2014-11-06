//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var User = require('../../models/User.js').User(db);
var Shortcut = require('../../models/Shortcut.js').Shortcut(db);
var Vote = require('../../models/Vote.js').Vote(db);

var q = require('q');

exports.save = function(inputShortcut) {
    var deffered = q.defer();

    //default 0 upvotes and downvotes
    inputShortcut.votes = [];
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


exports.find = function(criteria) {
    var deffered = q.defer();
    Shortcut.find(criteria)
        .populate('votes')
        .exec(function(error, shortcuts) {
            if (error) {
                console.log('error inside shortcutDAO when trying to find');
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
    Shortcut.findOne({
        _id: id
    }, function(error, shortcut) {
        if (error || !shortcut) {
            console.log('could not delete shortcut');
            console.log(error);
            deffered.reject(error);
        } else {
            shortcut.remove(function(error, shortcut) {
                if (error || !shortcut) {
                    deffered.reject(error);
                } else {
                    deffered.resolve(shortcut);
                }
            });
        }
    });
    return deffered.promise;
}