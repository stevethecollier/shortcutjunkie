angular.module('sj').controller('shortcutFormController', ['$scope', '$http', '$timeout', 'ShortcutFormService',
    function ($scope, $http, $timeout, ShortcutFormService) {

        $scope.newShortcut = ShortcutFormService.getShortcut();

        var apiFunctions = {
            post: function (newShortcut) {
                ShortcutFormService.createShortcut(newShortcut)
                    .then(function (data) {

                        debugger;

                        //reset form
                        $scope.newShortcut = {};
                        $scope.shortcutForm.$setPristine;
                        $scope.submitted = false;

                        //todo: add broadcast
                        

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
    
            debugger;

            $scope.submitted = true;
            if (shortcutForm.$valid) {
                apiFunctions[$scope.method]($scope.newShortcut);
            }
        };
    }
]);