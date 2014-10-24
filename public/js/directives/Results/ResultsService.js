var sjModule = angular.module('sj');
sjModule.factory('ResultsService', ['$q', '$http', '$rootScope',
    function($q, $http, $rootScope) {

        var results = {};

        return {
            getResults: function() {
                return results;
            },
            loadResults: function() {
                $http.get('/api/shortcuts').success(function(data, status, headers, config) {
                    if (data.shortcuts) {
                        results = data.shortcuts;
                        $rootScope.$broadcast('resultsChanged');
                    } else {
                        results = {};
                    }
                });
            },
            deleteShortcut: function(shortcut) {
                $http({
                    method: 'DELETE',
                    url: '/api/shortcuts',
                    params: {
                        'id': shortcut._id
                    }
                }).success(function(data) {
                    var index = results.indexOf(shortcut);
                    if (index > -1) {
                        results.splice(index, 1);
                        $rootScope.$broadcast('resultsChanged');
                    }
                });
            }
        }
    }
]);