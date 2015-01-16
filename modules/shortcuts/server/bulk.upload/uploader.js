'use strict';

var async = require('async'),
    utils = require('../../server/bulk.upload/utils.js');

exports.uploadShortcuts = function(shortcutsDir, done) {
    async.waterfall([

        function(callback) {
            utils.readShortcuts(shortcutsDir, function(error, shortcuts) {
                if (error) callback(error);
                else callback(null, shortcuts);
            });
        },
        function(shortcuts, callback) {
            utils.uploadShortcuts(shortcuts, function(error, saved) {
                if (error) callback(error);
                else callback(null, saved);
            });
        },
        function(saved, callback) {
            console.log('saved the following shortcuts:');
            console.log(saved);
            utils.deleteFiles(shortcutsDir, function(error) {
                if (error){
                    console.log('error when trying to delete shortcuts : ' + error);
                    callback(error);
                }
                else callback();
            });
        }
    ], function(error, saved) {
        if (error) return console.error(error);
        else console.log('bulk upload completed');
    });
};