'use strict';

// Shortcuts controller
angular.module('shortcuts').controller('ShortcutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Shortcuts',
	function($scope, $stateParams, $location, Authentication, Shortcuts) {
		$scope.authentication = Authentication;

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

		// Find a list of Shortcuts
		$scope.find = function() {
			$scope.shortcuts = Shortcuts.query();
			$scope.shortcuts.$promise.then(function() {
				$scope.applications = $scope.shortcuts.reduce(function(previousValue, currentValue) {
					if (previousValue.indexOf(currentValue.application) === -1) {
						previousValue.push(currentValue.application);
					}
					return previousValue;
				}, []);

				$scope.operatingSystems = $scope.shortcuts.reduce(function(previousValue, currentValue) {
					if (previousValue.indexOf(currentValue.operatingSystem) === -1) {
						previousValue.push(currentValue.operatingSystem);
					}
					return previousValue;
				}, []);
			});
		};

		// Find existing Shortcut
		$scope.findOne = function() {
			$scope.shortcut = Shortcuts.get({
				shortcutId: $stateParams.shortcutId
			});
		};

		$scope.selectedApplication = $stateParams.application;

		// $scope.selectOperatingSystem = function(operatingSystem){
		// 	$scope.selectedOS = operatingSystem;
		// };

		$scope.isEditor = function(user) {
			if (user.roles) {
				return user.roles.indexOf('editor') !== -1;
			} else {
				return false;
			}
		};

		$scope.view = function(shortcut) {
			$location.path('/shortcuts/' + shortcut._id);
		};

		$scope.$watch('shortcuts | applicationFilter:selectedApplication | operatingSystemFilter:selectedOS | groupBy', function(categories) {
			$scope.categories = categories;
		}, true);
	}
]);