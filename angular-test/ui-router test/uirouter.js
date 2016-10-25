var routerApp = angular.module('routerApp',[ui.router]);
routerApp.config(['$stateProvider','$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('idnex', {
				url: '/index',
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
			.state('index.usermng'), {
				url: '/usermng',
				views: {
					'main@index': {
						templateUrl: 'view/usermng.html',
						controller: function($scope, $state) {
							$scope.addUserType = function() {
								$state.go('index.usermng.addUserType');
							}
						} 
					}
				}
			}
			.state('index.usermng.highendusers', {
				url: '/highendusers',
				templateUrl: 'view/highendusers.html'
			})
			.state('index.usermng.normalusers', {
				url: '/normalusers',
				templateUrl: 'view/normalusers.html'
			})
			.state('index.usermng.lowusers', {
				url: '/lowusers',
				templateUrl: 'view/lowusers.html'
			})
			.state('index.usermng.addusertype', {
				url: '/addusertype',
				templateUrl: 'view/addusertypeform.html',
				controller: function($scope, $state) {
					$scope.backToPrevious = function() {
						window.history.back();
					}
				}
			})
	}])