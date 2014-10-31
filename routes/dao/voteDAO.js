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

exports.find = function() {
    var deffered = q.defer();
    Vote.find({})
        .populate('user')
        .populate('shortcut')
        .exec(function(error, votes) {
            if (error) {
                console.log('error inside voteDAO when trying to find');
                console.log(error);
                deffered.reject(error);
            } else {
                deffered.resolve(votes);
            }
        });
    return deffered.promise;
}

exports.set = function() {

}

exports.delete = function() {

}