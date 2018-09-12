var helloModule = angular.module('HelloAngular',[]);
helloModule.controller('HelloNgCtrl', ['$scope', function($scope){
	$scope.greeting = {
		text: 'Hello'
	};
}]);