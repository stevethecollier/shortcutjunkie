var sjModule = angular.module('sj');

sjModule.controller('editController', ['$scope', '$http', '$timeout', '$stateParams', 'ShortcutFormService',
    function ShortcutController($scope, $http, $timeout, $stateParams, ShortcutFormService) {
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
                    $scope.newShortcut = data.foundShortcuts[0];
                    ShortcutFormService.preloadShortcut($scope.newShortcut);
                    console.log(ShortcutFormService.getShortcut());
                } else {
                    $scope.noneFound = true;
                    $scope.newShortcut = false;
                }
            });
        }

        $scope.$on('shortcutSubmitted', function() {
            var submittedShortcut = ShortcutFormService.getShortcut();
            submittedShortcut._id = $scope.newShortcut._id;
            $http.put('api/shortcuts', submittedShortcut).success(function(data) {
                if (data) {
                    $scope.succeeded = true;
                } else {
                    alert(JSON.stringify(data));
                }
            });
        });
    }
]);