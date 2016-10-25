var userInfoModule = angular.module ('userInfoModule', []);
userInfoModule.controller('userCtrl',['$scope', function($scope){
	$scope.userInfo = {
		email: "wangchloe@yeah.net",
		password: "wangchloe",
		autoLogin: true

	};
	$scope.getFormData = function() {
		console.log($scope.userInfo);
	};
	$scope.setFormData = function() {
		$scope.userInfo = {
			email: "wangchloe@yeah.net",
			password: "wangchloe",
			autoLogin: true

		};
	};
}])