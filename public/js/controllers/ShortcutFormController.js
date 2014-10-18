angular.module('sj').controller('shortcutFormController', ['$scope', '$rootScope', '$http', '$timeout', 'ShortcutFormService',
    function ($scope, $rootScope, $http, $timeout, ShortcutFormService) {

        $scope.newShortcut = ShortcutFormService.getShortcut();

        var apiFunctions = {
            post: function (newShortcut) {
                ShortcutFormService.createShortcut(newShortcut)
                    .then(function (data) {
                        //reset form
                        $scope.newShortcut = {};
                        $scope.shortcutForm.$setPristine;
                        $scope.submitted = false;

                        //todo: add broadcast
                        $rootScope.$broadcast('shortcutSubmitted', data);

                    },function () {

                    });
            },
            put: function (newShortcut) {

            },
            get: function (newShortcut) {

            },
            delete: function (newShortcut) {

            }
        };

        $scope.submitShortcut = function (shortcutForm) {
            $scope.submitted = true;
            if (shortcutForm.$valid) {
                apiFunctions[$scope.method]($scope.newShortcut);
            }
        };
    }
]);