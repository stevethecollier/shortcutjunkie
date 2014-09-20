var Mongoose = require('mongoose');

exports.ShortcutSchema = new Mongoose.Schema({
    application : { type : String, required : true },
    operatingSystem : { type : String, required : true },
    keyset : { type : String, required : true },
    description : { type : String, required : true }
});
