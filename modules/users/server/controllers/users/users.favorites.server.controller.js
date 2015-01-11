'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * User middleware
 */
exports.addFavorite = function(req, res, next) {
    res.jsonp({
        message: 'yes'
    });
}