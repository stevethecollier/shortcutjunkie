var Mongoose = require('mongoose');
var User = require('./User.js').User;
var Shortcut = require('./Shortcut.js').Shortcut;

exports.VoteSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    shortcut: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'shortcut',
        required: true
    },
    direction: {
        type: String,
        required: true
    }
});

exports.Vote = function(db) {
    return db.model('vote', exports.VoteSchema);
}