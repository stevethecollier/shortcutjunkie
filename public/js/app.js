angular.module('sj', [
    'ui.router',
    'ngSanitize',
    'ui.bootstrap',
    'ngRoute',
    'auth0',
    'angular-storage',
    'angular-jwt'
])
    .config([
        '$routeProvider',
        'authProvider',
        '$httpProvider',
        '$locationProvider',
        'jwtInterceptorProvider',
        //Set up Auth0
        function($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
            authProvider.init({
                domain: 'shortcutjunkie.auth0.com',
                clientID: 'ko7shLb1fQmFoYzMBGXUpSaNKGeeQ9HK'
            });
            jwtInterceptorProvider.tokenGetter = function(store) {
                return store.get('token');
            }
            $httpProvider.interceptors.push('jwtInterceptor');
        }
    ])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
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
    .run([
        '$rootScope',
        'auth',
        'store',
        'jwtHelper',
        '$location',
        function($rootScope, auth, store, jwtHelper, $location) {
            $rootScope.$on('$locationChangeStart', function() {
                if (!auth.isAuthenticated) {
                    var token = store.get('token');
                    if (token) {
                        if (!jwtHelper.isTokenExpired(token)) {
                            auth.authenticate(store.get('profile'), token);
                        } else {
                            $location.path('/login');
                        }
                    }
                }
            });
        }
    ]);