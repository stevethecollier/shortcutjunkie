'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	mongoose = require('mongoose'),
	passport = require('passport'),
	logger = require('tracer').console(),
	User = mongoose.model('User'),
	Shortcut = mongoose.model('Shortcut');



/**
 * Add a favorite shortcut to the user
 */
exports.addFavorite = function(req, res, next) {
	var favorites = req.user.favorites;

	var selection;
	var count_change = 0;

	if (req.method === 'POST') {
		selection = req.body._id;
		var isNotDuplicate = favorites.indexOf(selection) === -1;
		if (isNotDuplicate) {
			favorites.push(selection);
			count_change++;
		}
	} else if (req.method === 'DELETE') {
		selection = mongoose.Types.ObjectId(req.shortcutId);
		_.remove(favorites, function(favorite) {
			return _.isEqual(favorite, selection);
		});
		count_change--;
	}

	// Init Variables
	var user = req.user;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		User.update({
			_id: user._id
		}, {
			favorites: favorites
		}, {}, function(err, num) {
			if (err) logger.log(err);
			else {
				// Update the favorites count on the Shortcut
				Shortcut.findByIdAndUpdate(
					selection,
					{ $inc: { favoritesCount: count_change } },
					{},
					function(err, shortcut) {
						if (err) logger.log(err);
						else { res.json(favorites); }
					}
				);
			}
		});
	}
};

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				logger.log(err);
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = function(req, res) {
	var user = req.user;
	var message = null;

	if (user) {
		fs.writeFile('./modules/users/client/img/profile/uploads/' + req.files.file.name, req.files.file.buffer, function(uploadError) {
			if (uploadError) {
				return res.status(400).send({
					message: 'Error occurred while uploading profile picture'
				});
			} else {
				user.profileImageURL = 'modules/users/img/profile/uploads/' + req.files.file.name;

				user.save(function(saveError) {
					if (saveError) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(saveError)
						});
					} else {
						req.login(user, function(err) {
							if (err) {
								res.status(400).send(err);
							} else {
								res.json(user);
							}
						});
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Shortcut middleware
 */
exports.shortcutId = function(req, res, next, id) {
	req.shortcutId = id;
	next();
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};