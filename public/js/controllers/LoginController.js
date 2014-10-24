var sjModule = angular.module('sj');

sjModule.controller('loginController', ['$scope', 'auth', '$location', 'store',
    function LoginCtrl($scope, auth, $location, store) {
        $scope.loggedIn = false;

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
                $scope.loggedIn = auth.isAuthenticated;
                // Or using the object
                $scope.message = 'message changed';
                $scope.profile = auth.profile;
            }, function() {
                // Error callback
                console.log("error with sign on");
            });
        }

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $scope.loggedIn = auth.isAuthenticated;
        }
    }
]);