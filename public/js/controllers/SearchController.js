var sjModule = angular.module('sj');

//testing git bash function
sjModule.controller('searchController', ['$scope', '$http', '$timeout', 'ResultsService',
    function SearchController($scope, $http, $timeout, ResultsService) {

        ResultsService.clear();

        $http.get('/api/search/initial').success(function(data, status, headers, config) {
            $scope.searchChoices = data.searchChoices.filter(function(choice){
                var excluded = ['__v','_id','upvotes', 'downvotes'];
                var value = excluded.indexOf(choice.name) == -1;
                return value;
            });
        })

        $scope.searchCriteria = '';

        $scope.search = function(searchForm) {
            if (searchForm.$valid) {
                ResultsService.search($scope.searchType.name, $scope.searchCriteria);
            }
        };
    }
]);