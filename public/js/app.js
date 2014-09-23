angular.module('sj', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('shortcuts', {
                url : "/shortcuts", 
                templateUrl: "partials/shortcutHome.html"
            });
    }
);
