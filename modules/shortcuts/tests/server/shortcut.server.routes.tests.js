'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
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
describe('Shortcut CRUD tests', function() {
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
			roles: ['user', 'editor'],
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Shortcut
		user.save(function(error, user) {
			shortcut = {
				keyCombination: 'keyCombination',
				application: 'application',
				description: 'description',
				operatingSystem: 'operatingSystem',
				category: 'category',
			};

			done();
		});
	});

	it('should be able to save Shortcut instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shortcut
				agent.post('/api/shortcuts')
					.send(shortcut)
					.expect(200)
					.end(function(shortcutSaveErr, shortcutSaveRes) {
						// Handle Shortcut save error
						if (shortcutSaveErr) done(shortcutSaveErr);

						// Get a list of Shortcuts
						agent.get('/api/shortcuts')
							.end(function(shortcutsGetErr, shortcutsGetRes) {
								// Handle Shortcut save error
								if (shortcutsGetErr) done(shortcutsGetErr);

								// Get Shortcuts list
								var shortcuts = shortcutsGetRes.body;

								// Set assertions
								(shortcuts[0].user._id).should.equal(userId);
								(shortcuts[0].application).should.match(shortcut.application);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Shortcut instance if not logged in', function(done) {
		agent.post('/api/shortcuts')
			.send(shortcut)
			.expect(403)
			.end(function(shortcutSaveErr, shortcutSaveRes) {
				// Call the assertion callback
				done(shortcutSaveErr);
			});
	});

	it('should not be able to save Shortcut instance if no application is provided', function(done) {
		// Invalidate application field
		shortcut.application = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shortcut
				agent.post('/api/shortcuts')
					.send(shortcut)
					.expect(400)
					.end(function(shortcutSaveErr, shortcutSaveRes) {
						// Set message assertion
						(shortcutSaveRes.body.message).should.match('Please fill Shortcut application');

						// Handle Shortcut save error
						done(shortcutSaveErr);
					});
			});
	});

	it('should be able to update Shortcut instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shortcut
				agent.post('/api/shortcuts')
					.send(shortcut)
					.expect(200)
					.end(function(shortcutSaveErr, shortcutSaveRes) {
						// Handle Shortcut save error
						if (shortcutSaveErr) done(shortcutSaveErr);

						// Update Shortcut application
						shortcut.application = 'sublime';

						// Update existing Shortcut
						agent.put('/api/shortcuts/' + shortcutSaveRes.body._id)
							.send(shortcut)
							.expect(200)
							.end(function(shortcutUpdateErr, shortcutUpdateRes) {
								// Handle Shortcut update error
								if (shortcutUpdateErr) done(shortcutUpdateErr);

								// Set assertions
								(shortcutUpdateRes.body._id).should.equal(shortcutSaveRes.body._id);
								(shortcutUpdateRes.body.application).should.match(shortcut.application);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Shortcuts if not signed in', function(done) {
		// Create new Shortcut model instance
		var shortcutObj = new Shortcut(shortcut);

		// Save the Shortcut
		shortcutObj.save(function() {
			// Request Shortcuts
			request(app).get('/api/shortcuts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});
		});
	});

	it('retrieves a list of all applications', function(done) {
		// Create new Shortcut model instance
		var shortcut1 = new Shortcut(shortcut);
		shortcut1.save(function() {

			// Create another shortcut 
			shortcut.application = 'anotherApplication';
			var shortcut2 = new Shortcut(shortcut);
			shortcut2.save(function() {

				// Request Shortcuts
				request(app).get('/api/shortcuts?select=application')
					.end(function(req, res) {
						// Set assertion
						res.body.should.be.an.Array.with.lengthOf(2);

						// Call the assertion callback
						done();
					});
			});
		})
	});

	it('should be able to get a single Shortcut if not signed in', function(done) {
		// Create new Shortcut model instance
		var shortcutObj = new Shortcut(shortcut);

		// Save the Shortcut
		shortcutObj.save(function() {
			request(app).get('/api/shortcuts/' + shortcutObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('application', shortcut.application);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Shortcut instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shortcut
				agent.post('/api/shortcuts')
					.send(shortcut)
					.expect(200)
					.end(function(shortcutSaveErr, shortcutSaveRes) {
						// Handle Shortcut save error
						if (shortcutSaveErr) done(shortcutSaveErr);

						// Delete existing Shortcut
						agent.delete('/api/shortcuts/' + shortcutSaveRes.body._id)
							.send(shortcut)
							.expect(200)
							.end(function(shortcutDeleteErr, shortcutDeleteRes) {
								// Handle Shortcut error error
								if (shortcutDeleteErr) done(shortcutDeleteErr);

								// Set assertions
								(shortcutDeleteRes.body._id).should.equal(shortcutSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Shortcut instance if not signed in', function(done) {
		// Set Shortcut user 
		shortcut.user = user;

		// Create new Shortcut model instance
		var shortcutObj = new Shortcut(shortcut);

		// Save the Shortcut
		shortcutObj.save(function() {
			// Try deleting Shortcut
			request(app).delete('/api/shortcuts/' + shortcutObj._id)
				.expect(403)
				.end(function(shortcutDeleteErr, shortcutDeleteRes) {
					// Set message assertion
					(shortcutDeleteRes.body.message).should.match('User is not authorized');

					// Handle Shortcut error error
					done(shortcutDeleteErr);
				});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Shortcut.remove().exec();
		done();
	});
});