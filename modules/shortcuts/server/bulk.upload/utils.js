'use strict';
var fs = require('fs'),
    async = require('async'),
    _ = require('lodash');

exports.readShortcuts = function(callback) {
    var shortcutsDir = 'modules/shortcuts/server/bulk.upload/shortcuts/';
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
            callback(_.flatten(shortcuts));
        }
    );
}