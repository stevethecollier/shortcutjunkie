'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    expect = require('chai').expect, // jshint ignore:line
    logger = require('tracer').console(),
    User = mongoose.model('User'),
    Shortcut = mongoose.model('Shortcut'),
    express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, shortcut;

/**
 * Shortcut routes tests
 */
describe('User route tests:', function() {
    before(function(done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    beforeEach(function(done) {
        // Create user credentials
        credentials = {
            username: 'username',
            password: 'password'
        };

        // Create a new user
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            roles: ['user'],
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });

        // Save a user to the test db and create new Shortcut
        user.save(function(error, user) {
            shortcut = new Shortcut({
                keyCombination: 'keyCombination',
                application: 'application',
                description: 'description',
                operatingSystem: 'operatingSystem',
                category: 'category',
                created: Date.now(),
                user: mongoose.Types.ObjectId(user._id),
                favoritesCount: 1
            });
            shortcut.save(function(error, shortcut) {
                User.update(user, {
                    favorites: [mongoose.Types.ObjectId(shortcut._id)]
                }, {}, function(error, num) {
                    agent.post('/api/auth/signin')
                        .send(credentials)
                        .expect(200)
                        .end(function(signinErr, signinRes) {
                            // Handle signin error
                            if (signinErr) done(signinErr);
                            done();
                        });
                });
            });
        });
    });

    describe('Favorites tests:', function() {
        it('adds favorites', function(done) {
            // Get the userId
            var userId = user.id;

            shortcut = new Shortcut({
                keyCombination: 'test',
                application: 'test',
                description: 'test',
                operatingSystem: 'test',
                category: 'test',
                created: Date.now(),
                user: mongoose.Types.ObjectId(user._id)
            });

            shortcut.save(function(error, shortcut) {
                agent.post('/api/users/favorites/')
                    .expect(200)
                    .send(shortcut)
                    .end(function(error, res) {
                        if (error) done(error);
                        //verify the shortcut is in the response favorites
                        expect(res.body).to.contain(shortcut._id.toString());
                        done();
                    });
            });
        });

        it('does not add duplicates', function(done) {
            // Get the userId
            var userId = user.id;

            shortcut.save(function(error, shortcut) {
                agent.post('/api/users/favorites/')
                    .expect(200)
                    .send(shortcut)
                    .end(function(error, res) {
                        if (error) done(error);
                        //verify the shortcut is in the response favorites
                        expect(res.body.length).to.equal(1);
                        done();
                    });
            });
        });

        it('deletes favorites', function(done) {
            // Get the userId
            var userId = user.id;

            agent.delete('/api/users/favorites/' + shortcut._id)
                .expect(200)
                .end(function(error, res) {
                    if (error) done(error);
                    //verify the shortcut is in the response favorites
                    expect(res.body).not.to.contain(shortcut._id.toString());

                    done();
                });
        });

        it('increments shortcut favorite count', function(done) {
            var userId = user.id;

            shortcut = new Shortcut({
                keyCombination: 'test',
                application: 'test',
                description: 'test',
                operatingSystem: 'test',
                category: 'test',
                created: Date.now(),
                user: mongoose.Types.ObjectId(user._id)
            });

            shortcut.save(function(error, shortcut) {
                agent.post('/api/users/favorites/')
                    .expect(200)
                    .send(shortcut)
                    .end(function(error, res) {
                        if (error) done(error);
                        //Get the updated shortcut
                        Shortcut.findById(shortcut._id, function(error, shortcut) {
                            if(error) done(error);
                            expect(shortcut.favoritesCount).to.equal(1);
                            done();
                        });
                    }
                );
            });
        });

        it('decrements shortcut favorite count', function(done) {
            var userId = user.id;
            var favoritesCount = shortcut.favoritesCount;

            agent.delete('/api/users/favorites/' + shortcut._id)
                .expect(200)
                .send(shortcut)
                .end(function(error, res) {
                    if (error) done(error);
                    //Get the updated shortcut
                    Shortcut.findById(shortcut._id, function(error, shortcut) {
                        if(error) done(error);
                        expect(shortcut.favoritesCount).to.equal(favoritesCount-1);
                        done();
                    });
                }
            );
        });
    });

    afterEach(function(done) {
        User.remove().exec();
        Shortcut.remove().exec();
        done();
    });
});