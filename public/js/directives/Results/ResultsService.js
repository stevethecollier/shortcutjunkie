var sjModule = angular.module('sj');
sjModule.factory('ResultsService', ['$q', '$http', '$rootScope',
    function($q, $http, $rootScope) {

        var results = {};

        return {
            getResults: function() {
                return results;
            },
            loadAll: function() {
                $http.get('/api/shortcuts').success(function(data, status, headers, config) {
                    if (data.shortcuts) {
                        results = data.shortcuts;
                        $rootScope.$broadcast('resultsChanged');
                    } else {
                        results = {};
                    }
                });
            },
            clear: function(){
                results = {};
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
            },
            vote: function(shortcut, direction) {
                $http({
                    method: 'POST',
                    url: '/api/shortcuts/vote',
                    params: {
                        'id': shortcut._id,
                        'direction': direction
                    }
                }).success(function(data) {
                    //can't use indexof, better way to optimize?
                    for (var index in results) {
                        var shortcut = results[index];
                        if (shortcut._id == data._id) {
                            results[index].upvotes = data.upvotes;
                            results[index].downvotes = data.downvotes;
                        }
                    }
                });
            }
        }
    }
]);