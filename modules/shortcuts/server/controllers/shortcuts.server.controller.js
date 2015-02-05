'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Shortcut = mongoose.model('Shortcut'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Shortcut
 */
exports.create = function(req, res) {
	var shortcut = new Shortcut(req.body);
	shortcut.user = req.user;

	shortcut.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shortcut);
		}
	});
};

/**
 * Show the current Shortcut
 */
exports.read = function(req, res) {
	res.jsonp(req.shortcut);
};

/**
 * Update a Shortcut
 */
exports.update = function(req, res) {
	var shortcut = req.shortcut;

	shortcut = _.extend(shortcut, req.body);

	shortcut.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shortcut);
		}
	});
};

/**
 * Delete an Shortcut
 */
exports.delete = function(req, res) {
	var shortcut = req.shortcut;

	shortcut.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shortcut);
		}
	});
};

/**
 * List of Shortcuts
 */
exports.list = function(req, res) {
	var displayFavorites;
	if (req.query.favorites) {
		displayFavorites = true;
		delete req.query.favorites;
	}

	var select;
	if (req.query.select) {
		select = req.query.select;
		delete req.query.select;
	}

	Shortcut.find(req.query).sort('-created').populate('user', 'displayName').exec(function(err, shortcuts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if (displayFavorites) {
				shortcuts = _.filter(shortcuts, function(shortcut) {
					return _.some(req.user.favorites, function(favorite) {
						return favorite.toString() === shortcut._id.toString();
					});
				});
			}
			if (select) {
				shortcuts = _.reduce(shortcuts, function(result, shortcut) {
					var field = shortcut[select];
					if(!_.contains(result, field)){
						result.push(field);
					}
					return result;
				}, []);
			}
			res.jsonp(shortcuts);
		}
	});
};

/**
 * Shortcut middleware
 */
exports.shortcutByID = function(req, res, next, id) {
	Shortcut.findById(id)
		.populate('user', 'displayName')
		.exec(function(err, shortcut) {
			if (err) return next(err);
			if (!shortcut) return next(new Error('Failed to load Shortcut ' + id));
			req.shortcut = shortcut;
			next();
		});
};