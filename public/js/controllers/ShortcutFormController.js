angular.module('sj').controller('shortcutFormController', ['$scope', '$http', '$timeout', 'ShortcutFormService',
    function ShortcutController($scope, $http, $timeout, ShortcutFormService) {

        $scope.newShortcut = ShortcutFormService.getShortcut();

        $scope.submitShortcut = function(shortcutForm) {
            $scope.submitted = true;
            if (shortcutForm.$valid) {
                ShortcutFormService.setShortcut($scope.newShortcut);
                //reset form
                $scope.newShortcut = {};
                $scope.shortcutForm.$setPristine;
                $scope.submitted = false;
            }
        };
    }
]);