'use strict';
angular.module('shortcuts').filter('groupBy', function() {
    return function(shortcuts, field) {
        var filtered = {};
        // loop through each shortcut in the list
        angular.forEach(shortcuts, function(shortcut) {
            var key = shortcut[field];
            // no key becomes unsorted
            if(key === ''){
                key = 'unsorted';
            }
            // add keys if they don't exist
            if(filtered[key] === undefined){
                filtered[key] = [];
            }
            // add shortcut to key
            filtered[key].push(shortcut);
        });
        return filtered;
    };
});