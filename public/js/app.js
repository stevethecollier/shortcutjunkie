angular.module('sj', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
    	function($stateProvider, $urlRouterProvider){
	    	$urlRouterProvider.otherwise('/');
	        $stateProvider
	            .state('shortcuts', {
	                url : "/partials/shortcuts", 
	                templateUrl: "/partials/shortcutHome.html",
	                controller:"shortcutController"
	            });
	        $stateProvider
	        	.state('search', {
	        		url : "/partials/search",
	        		templateUrl : "/partials/search.html",
	        		controller:"searchController"
	        	});
    }
]);