angular.module('sj', ["ngResource"]).
    config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider){
            $locationProvider.html5Mode(true);
            $routeProvider
                .when("/api/shortcuts", {
                    templateUrl: "/api/partials/shortcutHome.html",
                    controller: "ShortcutController"
            });
        }
    ]
);
console.log('angular app.js is getting called');
