var sjModule = angular.module('sj');
sjModule.factory('ShortcutFormService', function($rootScope) {

    var submittedShortcut = {};

    return {
        getShortcut: function() {
            return submittedShortcut;
        },
        setShortcut: function(shortcut) {
            submittedShortcut = shortcut;
            $rootScope.$broadcast('shortcutSubmitted');
        },
        preloadShortcut: function(shortcut) {
            if (shortcut) {
                submittedShortcut = shortcut;
            } else {
                submittedShortcut = {};
            }
        }
    }
});