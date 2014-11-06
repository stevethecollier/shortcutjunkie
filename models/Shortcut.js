var Mongoose = require('mongoose');
var Vote = require('./Vote.js').Vote;

exports.ShortcutSchema = new Mongoose.Schema({
    application: {
        type: String,
        required: true
    },
    operatingSystem: {
        type: String,
        required: true
    },
    keyset: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    votes: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'vote',
        required: false
    }]
});

exports.Shortcut = function(db) {
    return db.model('shortcut', exports.ShortcutSchema);
}