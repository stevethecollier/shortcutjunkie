'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect,
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    utils = require('../../server/bulk.upload/utils.js');

var expected = [{
    "keyCombination": "Option-Marquee",
    "description": "Draw Marquee from Center",
    "application": "Photoshop",
    "operatingSystem": "OS X",
    "category": "Selecting"
}, {
    "keyCombination": "Alt - Marquee",
    "description": "Draw Marquee from Center",
    "application": "Photoshop",
    "operatingSystem": "Windows",
    "category": "Selecting"
}]

/**
 * Unit tests
 */
describe('Bulk upload:', function() {
    it('reads shortcuts', function(done) {
        utils.readShortcuts(function(shortcuts) {
            expect(shortcuts).to.deep.equal(expected);
            done();
        });
    });

    it('saves shortcuts', function(done) {
        utils.uploadShortcuts(expected, function(shortcuts){
            expect(shortcuts).to.deep.equal(expected);
            done();
        });
    })
});