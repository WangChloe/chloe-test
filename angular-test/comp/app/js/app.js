//依赖注入
var chloeApp = angular.module('c', [
	'ui.router', 'ngAnimate', 'chloeCtrls', 'chloeFilters',
	'chloeServices', 'chloeDirectives'
]);

// chloeApp.config(function($routeProvider) {
chloeApp.config(function($stateProvider, $urlRouterProvider){
	// $routeProvider.when('/hello', {
	$urlRouterProvider.otherwise('/hello');
	//another method
	//$urlRouterProvider.when('', '/hello');

	$stateProvider
	.state('hello',{
		url: '/hello',
		templateUrl: 'view/hello.html',
		controller: 'HelloCtrl'
	})
	.state('list',{
		url: '/list',
		templateUrl: 'view/list.html',
		controller: 'ListCtrl'
	});
	//ui-router no support
	// .otherwise({
	// 	redirectTo: '/hello'
	// });
});