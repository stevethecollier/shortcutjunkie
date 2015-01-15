'use strict';
var fs = require('fs');

exports.readFiles = function(done) {
    var shortcutsDir = 'modules/shortcuts/server/bulk.upload/shortcuts/';
    var files = fs.readdirSync(shortcutsDir);
    console.log(files);
    fs.readFile('modules/shortcuts/server/bulk.upload/shortcuts/photoshopPC.json', 'utf8', function(error, data) {
        if (!error && data){
            var shortcuts = JSON.parse(data);
            // console.log(shortcuts);
            done();
        };
    });

}