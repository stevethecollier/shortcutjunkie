'use strict';
angular.module('shortcuts').filter('groupBy', function($parse) {
    return function(shortcuts) {
        var filtered = {};
        // loop through each item in the list
        angular.forEach(shortcuts, function(shortcut) {
            var category = shortcut.category;
            if(category === ''){
                category = 'unsorted';
            }
            if(filtered[category] === undefined){
                filtered[category] = [];
            }
            filtered[category].push(shortcut);
        });
        // console.log(filtered);
        return filtered;
    };
});