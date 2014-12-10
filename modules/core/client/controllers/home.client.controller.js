'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state',
	function($scope, Authentication, $state) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $state.transitionTo('home.shortcuts');
	}
]);