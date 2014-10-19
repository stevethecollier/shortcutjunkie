var sjModule = angular.module('sj');

sjModule.controller('editController', ['$scope', '$http', '$timeout', '$stateParams', 'ShortcutFormService',
    function ShortcutController($scope, $http, $timeout, $stateParams, ShortcutFormService) {
        $scope.succeeded = false;
        $scope.getShortcut = function() {
            var id = $stateParams.id;
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
                    ShortcutFormService.preloadShortcut(data.foundShortcuts[0]);
                } else {
                    $scope.noneFound = true;
                }
            });

            $scope.$on('shortcutSubmitted', function(){
                $scope.succeeded = true;
            });
        };
    }
]);