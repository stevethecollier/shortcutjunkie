'use strict';

//Setting up route
angular.module('shortcuts').config(['$stateProvider',
	function($stateProvider) {
		// Shortcuts state routing
		$stateProvider.
		state('home.applications', {
			views: {
				shortcuts: {
					templateUrl: 'modules/shortcuts/views/applications-shortcuts.client.view.html'
				}
			}
		}).
		state('shortcuts', {
			abstract: true,
			url: '/shortcuts',
			template: '<ui-view/>'
		}).
		state('shortcuts.applications', {
			url: '/application/:application',
			templateUrl: 'modules/shortcuts/views/applications-shortcuts.client.view.html'
		}).
		state('shortcuts.application', {
			url: '/application/:application',
			templateUrl: 'modules/shortcuts/views/list-shortcuts.client.view.html'
		}).
		state('shortcuts.favorites', {
			url: '/favorites',
			templateUrl: 'modules/shortcuts/views/list-shortcuts.client.view.html',
			resolve: {
				displayFavorites: function() {
					return {
						value: true
					};
				},
			},
			controller: function($scope, displayFavorites) {
				$scope.displayFavorites = displayFavorites.value;
			}
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