var Mongoose = require('mongoose');
var UserSchema = require('User.js').UserSchema;
var ShortcutSchema = require('Shortcut.js').ShortcutSchema;

exports.VoteSchema = new Mongoose.Schema({
    user_id : { type : String, required : true },
    votes : { type : Array, required : false }
});
