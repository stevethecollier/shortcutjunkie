angular.module('sj').controller('shortcutController', [
    '$scope',
    '$http',
    '$timeout',
    'ShortcutFormService',
    'ResultsService',
    function ShortcutController($scope, $http, $timeout, ShortcutFormService, ResultsService) {

        ResultsService.loadAll();

        //clear form
        ShortcutFormService.preloadShortcut();

        $scope.$on('shortcutSubmitted', function(event, shortcut) {
            ResultsService.addShortcut(shortcut);
        });
    }
]);