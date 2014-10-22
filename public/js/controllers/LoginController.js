var sjModule = angular.module('sj');

sjModule.controller('loginController', ['$scope', 'auth', '$location', 'store',
    function LoginCtrl($scope, auth, $location, store ) {
        $scope.message = 'message';
        $scope.login = function() {
            auth.signin({}, function(profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/');
            }, function() {
                // Error callback
            });
        }
    }
]);