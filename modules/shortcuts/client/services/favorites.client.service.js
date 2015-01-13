'use strict';

//Favorites service used to communicate Favorites REST endpoints
angular.module('shortcuts').factory('Favorites', ['$resource',
    function($resource) {
        return $resource('api/users/favorites/', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            get: {
                method: 'GET',
                isArray: true
            },
            save: {
                method: 'POST',
                isArray: true,
            },
            remove: {
                method: 'DELETE',
                isArray: true,
                url: 'api/users/favorites/:id',
            },
        });
    }
]);