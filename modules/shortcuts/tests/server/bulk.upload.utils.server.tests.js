'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect,
    assert = require('chai').assert,
    logger = require('tracer').console(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Shortcut = mongoose.model('Shortcut'),
    utils = require('../../server/bulk.upload/utils.js');


/**
 * Globals
 */
var user,
    credentials,
    expected = [{
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
describe('Bulk upload utils:', function() {
    before(function(done) {
        // Create user credentials
        credentials = {
            username: 'editoruser',
            password: 'password'
        };

        // Create a new user
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'ShortcutJunkie',
            email: 'test@test.com',
            roles: ['user', 'editor'],
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });
        user.save(function(error, _user) {
            user = _user;
            done();
        })
    });


    it('reads shortcuts', function(done) {
        utils.readShortcuts(function(shortcuts) {
            expect(shortcuts).to.deep.equal(expected);
            done();
        });
    });

    it('saves shortcuts', function(done) {
        utils.uploadShortcuts(expected, function(error, saved) {
            saved = JSON.stringify(saved);
            saved = JSON.parse(saved);

            saved.forEach(function(shortcut, index) {
                expect(shortcut.application).to.equal(expected[index].application);
                expect(shortcut.operatingSystem).to.equal(expected[index].operatingSystem);
                expect(shortcut.category).to.equal(expected[index].category);
                expect(shortcut.keyCombination).to.equal(expected[index].keyCombination);
            });

            done();
        });
    });

    it('deletes the files', function(done){
        utils.deleteFiles(function(error){
            expect(error).to.not.exist;
            done()
        })
    })

    after(function(done) {
        User.remove().exec();
        Shortcut.remove().exec();
        done();
    });
});