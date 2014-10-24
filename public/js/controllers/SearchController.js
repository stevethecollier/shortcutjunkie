var sjModule = angular.module('sj');

sjModule.controller('searchController', ['$scope', '$http', '$timeout', 'ResultsService',
    function SearchController($scope, $http, $timeout, ResultsService) {

        ResultsService.clear();

        $http.get('/api/search/initial').success(function(data, status, headers, config) {
            $scope.searchChoices = data.searchChoices;
        })

        $scope.submitted = false;
        $scope.searchCriteria = '';

        $scope.search = function(searchForm) {
            if (searchForm.$valid) {
                var criteria = {
                    criteriaKey: $scope.searchType.name,
                    criteriaValue: $scope.searchCriteria
                };

                var config = {
                    params: criteria
                }

                $http.get('api/search', config).success(function(data, status, headers, config) {
                    var foundShortcuts = data.foundShortcuts;
                    if (foundShortcuts.length > 0) {
                        $scope.noneFound = false;
                        $scope.foundShortcuts = data.foundShortcuts;
                    } else {
                        $scope.noneFound = true;
                        $scope.foundShortcuts = false;
                    }
                });
            }
        };
    }
]);