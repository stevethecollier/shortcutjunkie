var sjModule = angular.module('sj');

sjModule.controller('searchController', ['$scope', '$http', '$timeout', 'ResultsService',
    function SearchController($scope, $http, $timeout, ResultsService) {

        ResultsService.clear();

        $http.get('/api/search/initial').success(function(data, status, headers, config) {
            $scope.searchChoices = data.searchChoices;
        })

        $scope.searchCriteria = '';

        $scope.search = function(searchForm) {
            if (searchForm.$valid) {
                ResultsService.search($scope.searchType.name, $scope.searchCriteria);
            }
        };
    }
]);