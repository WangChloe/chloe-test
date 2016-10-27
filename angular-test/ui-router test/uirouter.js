var routerApp = angular.module('routerApp',['ui.router']);
routerApp.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');		//open html
		$stateProvider
			.state('index', {
				url: '/',
				views: {
					'': {
						templateUrl: 'view/index.html'
					},
					'topbar@index': {
						templateUrl: 'view/topbar.html'
					},
					'main@index': {
						templateUrl: 'view/home.html'
					}
				}
			})
			.state('index.usermng', {
				url: '/user',
				views: {
					'main@index': {		//replace html
						templateUrl: 'view/usermng.html',
						controller: function($scope, $state) {
							$scope.addUserType = function() {
								$state.go('index.usermng.addusertype');
							}
						} 
					}
				}
			})
			.state('index.usermng.high', {
				url: '/highendusers',
				templateUrl: 'view/high.html'
			})
			.state('index.usermng.normal', {
				url: '/normalusers',
				templateUrl: 'view/normal.html'
			})
			.state('index.usermng.low', {
				url: '/lowusers',
				templateUrl: 'view/low.html'
			})
			.state('index.usermng.addusertype', {
				url: '/addusertype',
				templateUrl: 'view/adduser.html',
				controller: function($scope, $state) {
					$scope.backToPrevious = function() {
						window.history.back();
					}
				}
			})
	})