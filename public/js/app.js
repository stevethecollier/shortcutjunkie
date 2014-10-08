angular.module('sj', ['ui.router', 'ngSanitize', 'ui.bootstrap', 'ngRoute'])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			$stateProvider.
				state('home', {
					url : '/',
					templateUrl : '/partials/home.html',
					data:{
						pageTitle : 'Shortcut Junkie'
					}
				});
			$stateProvider
				.state('shortcuts', {
					url : '/partials/shortcuts', 
					templateUrl: '/partials/shortcutHome.html',
					controller:'shortcutController',
					data:{
						pageTitle : 'Shortcuts Home'
					}
				});
			$stateProvider
				.state('search', {
					url : '/partials/search',
					templateUrl : '/partials/search.html',
					controller:'searchController',
					data:{
						pageTitle : 'Search Shortcuts'
					}
				});
			$stateProvider
				.state('edit', {
					url : '/partials/edit/{id}',
					templateUrl : '/partials/editShortcut.html',
					controller:'editController',
					data:{
						pageTitle : 'Edit Shortcut'
					}
				});
	}
]);