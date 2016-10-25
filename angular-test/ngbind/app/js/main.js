var myApp = angular.module('myApp',[]);
myApp.controller('cssCtrl',['$scope', function($scope){
	$scope.color = "red";
	$scope.isError = false;
	$scope.isWarning = false;

	$scope.setGreen = function() {
		$scope.color = "green";
	};

	$scope.showError = function() {
		$scope.message = "Error!!!";
		$scope.isError = true;
		$scope.isWarning = false;
	};

	$scope.showWarning = function() {
		$scope.message = "Warning!!!";
		$scope.isError = false;
		$scope.isWarning = true;
	}

}]);
myApp.controller('showCtrl',['$scope', function($scope){
	$scope.menuState = {
		show: false
	}	
	$scope.toggleMenu = function() {
		$scope.menuState.show = !$scope.menuState.show;
	}
}])