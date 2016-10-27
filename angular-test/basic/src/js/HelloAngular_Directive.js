var myModule = angular.module("MyMoudle", []);
myModule.directive("hello",function() {
	return {
		restrict:'AEMC',
		template: '<div>Hi everyone!</div>',
		replace: true
	};
});