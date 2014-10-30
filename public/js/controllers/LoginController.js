var sjModule = angular.module('sj');

sjModule.controller('loginController', ['$scope', '$rootScope', 'auth', '$location', 'store', '$http',
    function LoginCtrl($scope, $rootScope, auth, $location, store, $http) {
        
        $scope.$on('logout', function(){
            $scope.loggedIn = false;
        });

        $scope.$on('login', function(){
            $scope.loggedIn = true;
        });

        $scope.message = 'message';

        $scope.execute = function() {
            if ($scope.loggedIn) {
                $scope.logout();
            } else {
                $scope.login();
            }
        }

        $scope.login = function() {
            auth.signin({}, function(profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $scope.profile = auth.profile;
                $http.post('/api/users/secure', profile);
                $rootScope.$broadcast('login');
            }, function() {
                // Error callback
                console.log("error with sign on");
            });
        }

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $rootScope.$broadcast('logout');
        }
    }
]);