var sjModule = angular.module('sj');
sjModule.factory('ResultsService', ['$q', '$http', '$rootScope', 'auth',
    function($q, $http, $rootScope, auth) {

        var results = [];

        return {
            getResults: function() {
                results = results.sort(sortingByVotes());
                return results;
            },
            loadAll: function() {
                $http.get('/api/shortcuts').success(function(data, status, headers, config) {
                    if (data.shortcuts) {
                        results = data.shortcuts;
                        $rootScope.$broadcast('resultsChanged');
                    } else {
                        results = [];
                    }
                });
            },
            clear: function() {
                results = [];
            },
            search: function(searchType, searchValue) {
                var criteria = {
                    criteriaKey: searchType,
                    criteriaValue: searchValue
                };

                var config = {
                    params: criteria
                }

                $http.get('/api/search', config)
                    .success(function(data, status, headers, config) {
                        results = data.foundShortcuts;
                        $rootScope.$broadcast('resultsChanged');
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
            },
            addShortcut: function(shortcut) {
                results.push(shortcut);
            },
            vote: function(shortcut, direction) {
                var body = shortcut;
                body.direction = direction;
                body.user_id = auth.profile.user_id;
                $http.post('/api/shortcuts/vote', body)
                    .success(function(data) {
                        //can't use indexof, better way to optimize?
                        for (var index in results) {
                            var shortcut = results[index];
                            if (shortcut._id == data._id) {
                                results[index].upvotes = data.upvotes;
                                results[index].downvotes = data.downvotes;
                                $rootScope.$broadcast('resultsChanged');
                            }
                        }
                    });
            }
        }
    }
]);

function sortingByVotes() {
    return function(firstShortcut, secondShortcut) {
        var firstScore = score(firstShortcut);
        var secondScore = score(secondShortcut);
        if (firstScore < secondScore) {
            return 1;
        } else if (firstScore > secondScore) {
            return -1;
        } else {
            return 0;
        }
    }
}

function score(shortcut) {
    return shortcut.upvotes - shortcut.downvotes;
}