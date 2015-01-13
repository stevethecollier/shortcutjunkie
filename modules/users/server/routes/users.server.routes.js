'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../controllers/users.server.controller');

	// Setting up the users profile api
	app.route('/api/users/me').get(users.me);
	app.route('/api/users').put(users.update);
	app.route('/api/users/accounts').delete(users.removeOAuthProvider);
	app.route('/api/users/password').post(users.changePassword);
	app.route('/api/users/picture').post(users.changeProfilePicture);
	app.route('/api/users/favorites/').post(users.addFavorite);
	app.route('/api/users/favorites/:shortcutId').delete(users.addFavorite);

	// Finish by binding the user middleware
	app.param('userId', users.userByID);

	app.param('shortcutId', users.shortcutId);
};
