'use strict';
var fs = require('fs'),
    async = require('async'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Shortcut = mongoose.model('Shortcut'),
    _ = require('lodash'),
    logger = require('tracer').console();


exports.readShortcuts = function(shortcutsDir, callback) {
    var files = fs.readdirSync(shortcutsDir);
    async.map(files,
        function(file, done) {
            fs.readFile(shortcutsDir + file, 'utf8', function(error, data) {
                if (error) return done(error);

                var shortcuts = JSON.parse(data);
                return done(null, shortcuts);
            });
        },
        function(err, shortcuts) {
            if (err) return console.log(err);
            callback(null, _.flatten(shortcuts));
        }
    );
};

exports.uploadShortcuts = function(shortcuts, callback) {
    User.find({
        username: 'editoruser'
    }).exec(function(error, user) {
        async.map(shortcuts,
            function(shortcut, done) {
                shortcut = _.extend(shortcut, {
                    user: user._id
                });
                shortcut = new Shortcut(shortcut);
                shortcut.save(function(error, shortcut) {
                    if (error) done(error);
                    else done(null, shortcut);
                });
            },
            function(error, shortcuts) {
                if (error) return console.log(error);
                callback(null, shortcuts);
            }
        );
    });
};

exports.deleteFiles = function(shortcutsDir, callback) {
    var files = fs.readdirSync(shortcutsDir);
    async.map(files,
        function(file, done) {
            fs.unlink(shortcutsDir + file, function(error) {
                return done(error);
            });
        },
        function(error, shortcuts) {
            callback(error);
        }
    );
};