var sjModule = angular.module('sj');
sjModule.directive('results', function(){
	return {
        restrict: 'E',
        transclude: true,
		templateUrl: '/js/directives/Results/results.html'
	}
});