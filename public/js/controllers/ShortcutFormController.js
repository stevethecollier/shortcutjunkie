angular.module('sj').controller('shortcutFormController', ['$scope', '$rootScope', '$http', '$timeout', 'ShortcutFormService',
    function($scope, $rootScope, $http, $timeout, ShortcutFormService) {

        $rootScope.$on('shortcutChanged', function() {
            $scope.newShortcut = ShortcutFormService.getShortcut();
        });

        var apiFunctions = {
            post: function(newShortcut) {
                ShortcutFormService.createShortcut(newShortcut)
                    .then(function(data) {
                        //reset form
                        $scope.newShortcut = {};
                        $scope.shortcutForm.$setPristine;
                        $scope.submitted = false;

                        $rootScope.$broadcast('shortcutSubmitted', data);

                    }, function() {

                    });
            },
            put: function(newShortcut) {
                ShortcutFormService.updateShortcut(newShortcut)
                    .then(function(data) {
                        $rootScope.$broadcast('shortcutSubmitted', data);

                    }, function() {

                    });
            },
            get: function(newShortcut) {

            },
            delete: function(newShortcut) {

            }
        };

        $scope.submitShortcut = function(shortcutForm) {
            $scope.submitted = true;
            if (shortcutForm.$valid) {
                apiFunctions[$scope.method]($scope.newShortcut);
            }
        };
    }
]);