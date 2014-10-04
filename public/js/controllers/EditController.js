var sjModule = angular.module('sj');

sjModule.controller('editController', ['$scope', '$http', '$timeout', '$routeParams',
    function ShortcutController($scope, $http, $timeout, $routeParams) {
        $scope.getShortcut = function() {
        	var id = $routeParams.id;
        	console.log(id);
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
    }
]);

// TODO figure out directives
// sjModule.directive('results', function() {
//     return {
//         templateUrl: '/partials/foundShortcuts.html'
//     }
// });