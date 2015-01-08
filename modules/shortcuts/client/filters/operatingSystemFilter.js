'use strict';
angular.module('shortcuts').filter('operatingSystemFilter', function() {
    return function(shortcuts, operatingSystem) {
        if(!shortcuts || !operatingSystem || operatingSystem === ''){
            return shortcuts;
        }
        var filtered = [];
        for (var i = 0; i < shortcuts.length; i++) {
            var shortcut = shortcuts[i];
            if (shortcut.operatingSystem === operatingSystem) {
                filtered.push(shortcut);
            }
        }
        return filtered;
    };
});