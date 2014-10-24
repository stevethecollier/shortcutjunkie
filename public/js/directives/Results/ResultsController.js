angular.module('sj').controller('ResultsController', [
    '$scope',
    '$rootScope',
    '$http',
    '$timeout',
    'auth',
    'ResultsService',
    function ResultsController($scope, $rootScope, $http, $timeout, auth, ResultsService) {

        $rootScope.$on('resultsChanged', function() {
            $scope.foundShortcuts = ResultsService.getResults();
        });

        $scope.delete = function(shortcut) {
            ResultsService.deleteShortcut(shortcut);
        }

        $scope.vote = function(shortcut, direction) {
            if (auth.isAuthenticated) {
                ResultsService.vote(shortcut, direction);
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