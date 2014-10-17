angular.module('sj').controller('shortcutController', ['$scope', '$http', '$timeout',
    function ShortcutController($scope, $http, $timeout) {

        $http.get('/api/shortcuts').success(function(data, status, headers, config) {
            $scope.foundShortcuts = data.shortcuts;
        })

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

        $scope.newShortcut = {};
        
        $scope.addNewShortcut = function(shortcutForm) {
            $scope.submitted = true;
            if (shortcutForm.$valid) {
                $http.post('/api/shortcuts', $scope.newShortcut).success(function(data) {
                    if (data) {
                        $scope.foundShortcuts.push(data);
                        //reset form
                        $scope.newShortcut = {};
                        $scope.shortcutForm.$setPristine;
                        $scope.submitted = false;
                    } else {
                        alert(JSON.stringify(data));
                    }
                });
            }
        };
    }
]);