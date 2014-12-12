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
	keyCombination: {
		type: String,
		default: '',
		required: 'Please fill Shortcut key combination',
		trim: true
	},
	application: {
		type: String,
		default: '',
		required: 'Please fill Shortcut application',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Shortcut description',
		trim: true
	},
	operatingSystem: {
		type: String,
		default: '',
		required: 'Please fill Shortcut operating system',
		trim: true
	},
	category: {
		type: String,
		default: '',
		required: 'Please fill Shortcut category',
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