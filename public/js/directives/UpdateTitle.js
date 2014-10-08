var sjModule = angular.module('sj');
sjModule.directive('updateTitle', function($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                var title = 'DefaultTitle';
                if (toState.data && toState.data.pageTitle) {
                    title = toState.data.pageTitle;
                };
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    };
});