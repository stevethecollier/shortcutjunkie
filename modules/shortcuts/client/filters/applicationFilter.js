'use strict';
angular.module('shortcuts').filter('applicationFilter', function() {
    return function(shortcuts, application) {
        if (!shortcuts || !application || application === '') {
            return shortcuts;
        }
        var filtered = [];

        for (var i = 0; i < shortcuts.length; i++) {
            var shortcut = shortcuts[i];
            if (shortcut.application === application) {
                filtered.push(shortcut);
            }
        }

        return filtered;
    };
});