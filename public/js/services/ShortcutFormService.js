var sjModule = angular.module('sj');
sjModule.factory('ShortcutFormService', ['$q', '$http',
    function($q, $http) {

        var submittedShortcut = {};

        return {
            getShortcut: function() {
                return submittedShortcut;
            },
            updateShortcut: function(shortcut) {
                var submittedShortcut = ShortcutFormService.getShortcut();
                submittedShortcut._id = $scope.newShortcut._id;
                $http.put('api/shortcuts', submittedShortcut).success(function(data) {
                    if (data) {

                    } else {
                        alert(JSON.stringify(data));
                    }
                });
            },
            createShortcut: function(shortcut) {
                var deffered = $q.defer();
                $http.post('/api/shortcuts', shortcut)
                    .success(function(data, status, headers, config) {
                        deffered.resolve(data, status, headers, config);
                    }).error(function(data, status, headers, config) {
                        deffered.reject(data, status, headers, config);
                    });
                return deffered.promise;
            },
            deleteShortcut: function() {

            },
            preloadShortcut: function(shortcut) {
                if (shortcut) {
                    submittedShortcut = shortcut;
                } else {
                    submittedShortcut = {};
                }
            }
        }
    }
]);