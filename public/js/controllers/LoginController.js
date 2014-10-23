var sjModule = angular.module('sj');

sjModule.controller('loginController', ['$scope', 'auth', '$location', 'store',
    function LoginCtrl($scope, auth, $location, store) {
        $scope.loggedIn = false;

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
                debugger;
                store.set('profile', profile);
                store.set('token', token);
                $location.path("/");
                $scope.loggedIn = auth.isAuthenticated;
                console.log("end of authentication");
            }, function() {
                // Error callback
                debugger;
                console.log("error with sign on");
            });
        }

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
        }
    }
]);