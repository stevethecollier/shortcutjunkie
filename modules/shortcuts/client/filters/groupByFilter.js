'use strict';
angular.module('shortcuts').filter('groupBy', function() {
    return function(shortcuts, field) {
        var filtered = {};
        // loop through each item in the list
        angular.forEach(shortcuts, function(shortcut) {
            var value = shortcut[field];
            if(value === ''){
                value = 'unsorted';
            }
            if(filtered[value] === undefined){
                filtered[value] = [];
            }
            filtered[value].push(shortcut);
        });
        return filtered;
    };
});