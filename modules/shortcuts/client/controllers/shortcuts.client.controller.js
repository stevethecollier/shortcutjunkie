'use strict';

// Shortcuts controller
angular.module('shortcuts').controller('ShortcutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Shortcuts', 'Favorites', 'lodash', '$filter',
	function($scope, $stateParams, $location, Authentication, Shortcuts, Favorites, lodash, $filter) {
		var _ = lodash;

		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		// Create new Shortcut
		$scope.create = function() {
			// Create new Shortcut object
			var shortcut = new Shortcuts({
				keyCombination: this.keyCombination,
				application: this.application,
				description: this.description,
				operatingSystem: this.operatingSystem,
				category: this.category
			});

			// Redirect after save
			shortcut.$save(function(response) {
				$location.path('shortcuts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Shortcut
		$scope.remove = function(shortcut) {
			if (shortcut) {
				shortcut.$remove();

				for (var i in $scope.shortcuts) {
					if ($scope.shortcuts[i] === shortcut) {
						$scope.shortcuts.splice(i, 1);
					}
				}
			} else {
				$scope.shortcut.$remove(function() {
					$location.path('shortcuts');
				});
			}
		};

		// Update existing Shortcut
		$scope.update = function() {
			var shortcut = $scope.shortcut;

			shortcut.$update(function() {
				$location.path('shortcuts/' + shortcut._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		var pickInitialOS = function(operatingSystems) {
			var initialOS = '';
			if (navigator.appVersion.indexOf('Win') !== -1) {
				initialOS = 'Windows';
			} else if (
				navigator.appVersion.indexOf('Mac') !== -1) {
				initialOS = 'OS X';
			} else if (
				navigator.appVersion.indexOf('X11') !== -1) {
				initialOS = 'UNIX';
			} else if (
				navigator.appVersion.indexOf('Linux') !== -1) {
				initialOS = 'Linux';
			}
			if (operatingSystems.indexOf(initialOS) !== -1) {
				return initialOS;
			} else {
				return operatingSystems[0];
			}
		};

		// Find a list of Shortcuts
		$scope.find = function() {
			$scope.shortcuts = Shortcuts.query({
				application: $scope.selectedApplication
			});
			$scope.shortcuts.$promise
				.then(function() {
					$scope.applications = $scope.shortcuts.reduce(function(previousValue, currentValue) {
						if (previousValue.indexOf(currentValue.application) === -1) {
							previousValue.push(currentValue.application);
						}
						return previousValue;
					}, []);

					$scope.operatingSystems = $filter('applicationFilter')($scope.shortcuts, $scope.selectedApplication)
						.reduce(function(previousValue, currentValue) {
							if (previousValue.indexOf(currentValue.operatingSystem) === -1) {
								previousValue.push(currentValue.operatingSystem);
							}
							return previousValue;
						}, []);

				})
				.then(function() {
					$scope.selectedOS = pickInitialOS($scope.operatingSystems);
				});
		};

		// Find existing Shortcut
		$scope.findOne = function() {
			$scope.shortcut = Shortcuts.get({
				shortcutId: $stateParams.shortcutId
			});
		};

		$scope.selectedApplication = $stateParams.application;

		$scope.isEditor = function(user) {
			if (user.roles) {
				return user.roles.indexOf('editor') !== -1;
			} else {
				return false;
			}
		};

		$scope.toggleFavorite = function(shortcut) {
			if (!$scope.user) {
				return;
			}
			if (!$scope.isFavorite(shortcut)) {
				Favorites.save(shortcut, function(favorites) {
					$scope.user.favorites = favorites;
				});
			} else {
				Favorites.remove({
					id: shortcut._id
				}, function(favorites) {
					$scope.user.favorites = favorites;
				});
			}
		};

		$scope.isFavorite = function(shortcut) {
			if (!$scope.user) return false;
			return $scope.user.favorites.indexOf(shortcut._id) !== -1;
		};

		$scope.view = function(shortcut) {
			$location.path('/shortcuts/' + shortcut._id);
		};

		$scope.$watch('shortcuts | applicationFilter:selectedApplication | operatingSystemFilter:selectedOS | groupBy:"application"', function(appGroups) {
			$scope.appGroups = {};
			angular.forEach(appGroups, function(shortcuts, app) {
				if ($scope.displayFavorites) {
					shortcuts = _.remove(shortcuts, function(shortcut) {
						return _.contains($scope.user.favorites, shortcut._id);
					});
				}
				var categoryGroup = $filter('groupBy')(shortcuts, 'category');
				if (!_.isEmpty(categoryGroup)) {
					$scope.appGroups[app] = categoryGroup;
				}
			});
		}, true);
	}
]);