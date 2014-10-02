var sjModule = angular.module('sj');

sjModule.controller('searchController', ['$scope', '$http', '$timeout',
	function ShortcutController($scope, $http, $timeout) {

		$http.get('/api/search/initial').success(function(data, status, headers, config) {
			$scope.searchChoices = data.searchChoices;
		})

		$scope.searchType = {};
		$scope.searchCriteria = '';

		$scope.search = function() {
			var criteria = {
				criteriaKey: $scope.searchType.name,
				criteriaValue: $scope.searchCriteria
			};

			var config = {
				params: criteria
			}

			$http.get('api/search', config).success(function(data, status, headers, config) {
				$scope.foundShortcuts = data.foundShortcuts;
			});
		};
	}
]);

sjModule.directive('results', function(){
	return {
		template:
			'\
			<h3>Results</h3>\
			<ul ng-repeat="shortcut in foundShortcuts">\
				<li>application = {{shortcut.application}}</li>\
		        <li>operatingSystem = {{shortcut.operatingSystem}}</li>\
		        <li>keyset = {{shortcut.keyset}}</li>\
	            <li>description = {{shortcut.description}}</li>\
		        <li>id = {{shortcut._id}}</li>\
			</ul>\
			'
	}
});