var sjModule = angular.module('sj');
sjModule.factory('ShortcutFormService', ['$q', '$http', '$rootScope',
    function($q, $http, $rootScope) {

        var submittedShortcut = {};

        return {
            getShortcut: function() {
                return submittedShortcut;
            },
            updateShortcut: function(shortcut) {
                var deffered = $q.defer();
                $http.put('api/shortcuts', submittedShortcut)
                    .success(function(data, status, headers, config) {
                        if (data) {
                            //do something when put successful
                        } else {
                            alert(JSON.stringify(data));
                        }
                        deffered.resolve(data, status, headers, config);
                    }).error(function(data, status, headers, config) {
                        deffered.reject(data, status, headers, config);
                    });
                return deffered.promise;
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
                    $rootScope.$broadcast('shortcutChanged');
                } else {
                    submittedShortcut = {};
                }
            }
        }
    }
]);