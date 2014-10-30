var Mongoose = require('mongoose');

exports.UserSchema = new Mongoose.Schema({
    user_id : { type : String, required : true },
    votes : { type : Array, required : false }
});
