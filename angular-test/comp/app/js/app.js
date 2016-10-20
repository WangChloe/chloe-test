//依赖注入
var chloeApp = angular.module('chloeApp', [
	'ngRoute', 'ngAnimate', 'chloeCtrls', 'chloeFilters',
	'chloeServices', 'chloeDirectives'
]);

chloeApp.config(function($routeProvider) {
	$routeProvider.when('/hello', {
		templateUrl: 'view/hello.html',
		controller: 'HelloCtrl'
	}).when('/list',{
		templateUrl: 'view/list.html',
		controller: 'ListCtrl'
	}).otherwise({
		redirectTo: '/hello'
	})
});