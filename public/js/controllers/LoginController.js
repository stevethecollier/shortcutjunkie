var sjModule = angular.module('sj');

sjModule.controller('loginController', ['$scope', 'auth', '$location', 'store',
    function LoginCtrl($scope, auth, $location, store) {
        $scope.loggedIn = false;

        $scope.execute = function() {
            if ($scope.loggedIn){
                $scope.logout();
            } else {
                $scope.login();
            }
        }

        $scope.login = function() {
            auth.signin({}, function(profile, token) {
                // Success callback
                $scope.loggedIn = true;
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/');
            }, function() {
                // Error callback
            });
        }

        $scope.logout = function() {
            $scope.loggedIn= false;
            auth.signout();
            store.remove('profile');
            store.remove('token');
        }
    }
]);