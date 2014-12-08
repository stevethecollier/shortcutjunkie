'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Shortcut Schema
 */
var ShortcutSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Shortcut name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Shortcut', ShortcutSchema);