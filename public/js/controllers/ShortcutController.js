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
        }

        $scope.edit = function(shortcut) {
            var criteria = {
                criteriaKey: '_id',
                criteriaValue: shortcut._id
            };

            var config = {
                params: criteria
            }

            $http.get('/api/search/#/partials/edit', config);
        };

        $scope.setShortcuts = function(shortcuts) {
            $scope.foundShortcuts = shortcuts;
        };

        $scope.$on('shortcutSubmitted', function() {
            $http.post('/api/shortcuts', ShortcutFormService.getShortcut()).success(function(data) {
                if (data) {
                    $scope.foundShortcuts.push(data);
                } else {
                    alert(JSON.stringify(data));
                }
            });
        });
    }
]);