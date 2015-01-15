'use strict';
var fs = require('fs');

exports.readFile = function(done) {
    fs.readFile('modules/shortcuts/server/bulk.upload/photoshopPC.json', 'utf8', function(error, data) {
        if (!error && data){
            var shortcuts = JSON.parse(data);
            console.log(shortcuts);
            done();
        };
    });

}