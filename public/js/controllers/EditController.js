var sjModule = angular.module('sj');

sjModule.controller('editController', ['$scope', '$http', '$timeout', '$stateParams',
    function ShortcutController($scope, $http, $timeout, $stateParams) {
        $scope.getShortcut = function() {
        	var id = $stateParams.id;
        	console.log($stateParams);
            var criteria = {
                criteriaKey: '_id',
                criteriaValue: id
            };

            var config = {
                params: criteria
            };

            $http.get('api/search', config).success(function(data, status, headers, config) {
                var shortcuts = data.foundShortcuts;
                if (shortcuts.length > 0) {
                    $scope.noneFound = false;
                    $scope.shortcut = data.foundShortcuts[0];
                } else {
                    $scope.noneFound = true;
                    $scope.shortcut = false;
                }
            });
        }

        $scope.editShortcut = function() {
        	$http.put('api/shortcuts', $scope.shortcut).success(function(data){
        		$scope.succeeded = true;
        	})
        }
    }
]);