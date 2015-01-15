'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect,
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    utils = require('../../server/bulk.upload/utils.js');

/**
 * Unit tests
 */
describe('Shortcut Model Unit Tests:', function() {
    describe('Bulk upload', function() {
        it('reads file', function(done) {
            utils.readFile(function() {
                done();
            });
        });
    });
});