'use strict';

//Setting up route
angular.module('shortcuts').config(['$stateProvider',
	function($stateProvider) {
		// Shortcuts state routing
		$stateProvider.
		state('home.shortcuts', {
			views: {
				shortcuts: {
					templateUrl: 'modules/shortcuts/views/list-shortcuts.client.view.html'
				}
			}
		}).
		state('shortcuts', {
			abstract: true,
			url: '/shortcuts',
			template: '<ui-view/>'
		}).
		state('shortcuts.list', {
			url: '',
			templateUrl: 'modules/shortcuts/views/list-shortcuts.client.view.html'
		}).
		state('shortcuts.create', {
			url: '/create',
			templateUrl: 'modules/shortcuts/views/create-shortcut.client.view.html'
		}).
		state('shortcuts.view', {
			url: '/:shortcutId',
			templateUrl: 'modules/shortcuts/views/view-shortcut.client.view.html'
		}).
		state('shortcuts.edit', {
			url: '/:shortcutId/edit',
			templateUrl: 'modules/shortcuts/views/edit-shortcut.client.view.html'
		});
	}
]);