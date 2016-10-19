function CommonController($scope) {
	$scope.commonFn=function(){
		alert("common function");
	};
}

function Controller1($scope) {
	$scope.greeting = {
		text: 'Hello1'
	};
	$scope.test1 = function(){
		alert('test1');
	};
}

function Controller2($scope) {
	$scope.greetig = {
		text: 'Hello2'
	};
	$scope.test2 = function(){
		alert('test2');
	};
}