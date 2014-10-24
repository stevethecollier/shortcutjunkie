angular.module('sj').controller('ResultsController', [
    '$scope',
    '$rootScope',
    '$http',
    '$timeout',
    'auth',
    'ResultsService',
    function ResultsController($scope, $rootScope, $http, $timeout, auth, ResultsService) {

        ResultsService.loadResults();

        $rootScope.$on('resultsChanged', function() {
            $scope.foundShortcuts = ResultsService.getResults();
        });

        $scope.delete = function(shortcut) {
            ResultsService.deleteShortcut(shortcut);
        }

        $scope.vote = function(shortcut, direction) {
            if (auth.isAuthenticated) {
                $http({
                    method: 'POST',
                    url: '/api/shortcuts/vote',
                    params: {
                        'id': shortcut._id,
                        'direction': direction
                    }
                }).success(function(data) {
                    //can't use indexof, better way to optimize?
                    for (var index in $scope.foundShortcuts) {
                        if (shortcut._id == data._id) {
                            $scope.foundShortcuts[index].upvotes = data.upvotes;
                            $scope.foundShortcuts[index].downvotes = data.downvotes;
                        }
                    }
                });
            } else {
                console.log("not logged in");
            }
        }

        $scope.edit = function(shortcut) {
            var criteria = {
                criteriaKey: '_id',
                criteriaValue: shortcut._id
            };

            var config = {
                params: criteria
            };

            $http.get('/api/search/#/partials/edit', config);
        };

        $scope.setShortcuts = function(shortcuts) {
            $scope.foundShortcuts = shortcuts;
        };

    }
]);