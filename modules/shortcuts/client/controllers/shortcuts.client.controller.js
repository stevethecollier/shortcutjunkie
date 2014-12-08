'use strict';

// Shortcuts controller
angular.module('shortcuts').controller('ShortcutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Shortcuts',
	function($scope, $stateParams, $location, Authentication, Shortcuts ) {
		$scope.authentication = Authentication;

		// Create new Shortcut
		$scope.create = function() {
			// Create new Shortcut object
			var shortcut = new Shortcuts ({
				name: this.name
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
		$scope.remove = function( shortcut ) {
			if ( shortcut ) { shortcut.$remove();

				for (var i in $scope.shortcuts ) {
					if ($scope.shortcuts [i] === shortcut ) {
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
			var shortcut = $scope.shortcut ;

			shortcut.$update(function() {
				$location.path('shortcuts/' + shortcut._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Shortcuts
		$scope.find = function() {
			$scope.shortcuts = Shortcuts.query();
		};

		// Find existing Shortcut
		$scope.findOne = function() {
			$scope.shortcut = Shortcuts.get({ 
				shortcutId: $stateParams.shortcutId
			});
		};
	}
]);