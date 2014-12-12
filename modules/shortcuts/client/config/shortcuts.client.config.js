'use strict';

// Configuring the Shortcuts module
angular.module('shortcuts').run(['Menus',
	function(Menus) {
		// Add the Shortcuts dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Shortcuts',
			state: 'shortcuts',
			type: 'dropdown',
			isPublic: true
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'shortcuts', {
			title: 'List Shortcuts',
			state: 'shortcuts.list',
			isPublic: true
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'shortcuts', {
			title: 'Create Shortcut',
			state: 'shortcuts.create',
			isPublic: false,
			roles: ['editor']
		});
	}
]);