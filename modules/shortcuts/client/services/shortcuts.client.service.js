'use strict';

//Shortcuts service used to communicate Shortcuts REST endpoints
angular.module('shortcuts').factory('Shortcuts', ['$resource',
    function($resource) {
        return $resource('api/shortcuts/:shortcutId', {
            shortcutId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);