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
describe('Shortcut Model Unit Tests:', function() {
    describe('Bulk upload', function() {
        it('reads file', function(done) {
            utils.readFiles(function(shortcuts) {
                expect(shortcuts).to.deep.equal(expected);
                done();
            });
        });
    });
});