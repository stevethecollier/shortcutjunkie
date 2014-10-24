angular.module('sj').controller('shortcutController', [
    '$scope',
    '$http',
    '$timeout',
    'ShortcutFormService',
    function ShortcutController($scope, $http, $timeout, ShortcutFormService) {

        //clear form
        ShortcutFormService.preloadShortcut();

        $scope.$on('shortcutSubmitted', function(event, shortcut) {
            $scope.foundShortcuts.push(shortcut);
        });
    }
]);