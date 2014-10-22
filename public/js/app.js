angular.module('sj', [
    'ui.router',
    'ngSanitize',
    'ui.bootstrap',
    'ngRoute',
    'auth0',
    'angular-storage',
    'angular-jwt'
])
    .config(
        //Set up Auth0
        function(authProvider) {
            authProvider.init({
                domain: 'shortcutjunkie.auth0.com',
                clientID: 'ko7shLb1fQmFoYzMBGXUpSaNKGeeQ9HK'
            });
        })
    .config(['$stateProvider', '$urlRouterProvider',
        //Set up state provider
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.
            state('home', {
                url: '/',
                templateUrl: '/partials/home.html',
                data: {
                    pageTitle: 'Shortcut Junkie'
                }
            });
            $stateProvider
                .state('shortcuts', {
                    url: '/partials/shortcuts',
                    templateUrl: '/partials/shortcutHome.html',
                    controller: 'shortcutController',
                    data: {
                        pageTitle: 'Shortcuts Home'
                    }
                });
            $stateProvider
                .state('search', {
                    url: '/partials/search',
                    templateUrl: '/partials/search.html',
                    controller: 'searchController',
                    data: {
                        pageTitle: 'Search Shortcuts'
                    }
                });
            //Edit state is only valid if there is an id
            $stateProvider
                .state('editError', {
                    url: '/partials/edit/',
                    onEnter: function($state) {
                        $state.go('home');
                    }
                });
            $stateProvider
                .state('edit', {
                    url: '/partials/edit/{id}',
                    templateUrl: '/partials/editShortcut.html',
                    controller: 'editController',
                    data: {
                        pageTitle: 'Edit Shortcut'
                    }
                });
        }
    ])
    .run(function(auth) {
        // This hooks all auth events to check everything as soon as the app starts
        auth.hookEvents();
    });