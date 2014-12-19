'use strict';
angular.module('shortcuts').filter('categoryFilter', function() {
    return function(shortcuts, category) {
        if(!category || category === ''){
            return shortcuts;
        }
        var filtered = [];
        for (var i = 0; i < shortcuts.length; i++) {
            var shortcut = shortcuts[i];
            if (shortcut.category === category) {
                filtered.push(shortcut);
            }
        }
        return filtered;
    };
});