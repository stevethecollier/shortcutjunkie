'use strict';

module.exports = function(app) {
	var shortcuts = require('../controllers/shortcuts.server.controller');
	var shortcutsPolicy = require('../policies/shortcuts.server.policy');

	// Shortcuts Routes
	app.route('/api/shortcuts').all()
		.get(shortcuts.list).all(shortcutsPolicy.isAllowed)
		.post(shortcuts.create);

	app.route('/api/shortcuts/:shortcutId').all(shortcutsPolicy.isAllowed)
		.get(shortcuts.read)
		.put(shortcuts.update)
		.delete(shortcuts.delete);

	// Finish by binding the Shortcut middleware
	app.param('shortcutId', shortcuts.shortcutByID);
};