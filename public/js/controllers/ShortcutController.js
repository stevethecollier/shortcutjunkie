angular.module('sj').controller('shortcutController', ['$scope', '$http', '$timeout', 'ShortcutFormService',
    function ShortcutController($scope, $http, $timeout, ShortcutFormService) {

        $http.get('/api/shortcuts').success(function(data, status, headers, config) {
            $scope.foundShortcuts = data.shortcuts;
        })

        //clear form
        ShortcutFormService.preloadShortcut();

        $scope.delete = function(shortcut) {
            $http({
                method: 'DELETE',
                url: '/api/shortcuts',
                params: {
                    'id': shortcut._id
                }
            }).success(function(data) {
                var index = $scope.foundShortcuts.indexOf(shortcut);
                if (index > -1) {
                    $scope.foundShortcuts.splice(index, 1);
                }
            })
        };

        $scope.voteUp = function(shortcut) {
            $http({
                method: 'POST',
                url: '/api/shortcuts/vote',
                params: {
                    'id': shortcut._id
                }
            }).success(function(data) {
                //can't use indexof, better way to optimize?
                for (var index in $scope.foundShortcuts) {
                    if (shortcut._id == data._id) {
                        $scope.foundShortcuts[index].upvotes += 1;
                    }
                }
            })
        }

        $scope.voteDown = function(shortcut) {
            var index = $scope.foundShortcuts.indexOf(shortcut);
            $scope.foundShortcuts[index].downvotes -= 1;
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

        $scope.$on('shortcutSubmitted', function(event, shortcut) {
            $scope.foundShortcuts.push(shortcut);
        });
    }
]);