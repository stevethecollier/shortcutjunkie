'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Shortcut = mongoose.model('Shortcut');

/**
 * Globals
 */
var user, shortcut;

/**
 * Unit tests
 */
describe('Shortcut Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			shortcut = new Shortcut({
				keyCombination: 'keyCombination',
				application: 'application',
				description: 'description',
				operatingSystem: 'operatingSystem',
				category: 'category',
				created: Date.now(),
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return shortcut.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without application', function(done) {
			shortcut.application = '';

			return shortcut.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Shortcut.remove().exec();
		User.remove().exec();

		done();
	});
});