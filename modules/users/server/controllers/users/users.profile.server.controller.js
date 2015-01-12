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
	User = mongoose.model('User');



/**
 * Add a favorite shortcut to the user
 */
exports.addFavorite = function(req, res, next) {
	var favorites = req.user.favorites;
	var action = req.body.action;
	var selection = req.body.shortcut._id;

	if (action === 'add') {
		var isNotDuplicate = favorites.indexOf(selection) === -1;
		if (isNotDuplicate) {
			favorites.push(selection);
		}
	} else if (action === 'remove') {
		_.remove(favorites, function(favorite) {
			return favorite.toString() === selection;
		});
	}

	// let the update route handle the rest
	req.body = {};
	next();
}

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
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};