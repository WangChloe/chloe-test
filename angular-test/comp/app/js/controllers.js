var chloeCtrls = angular.module('chloeCtrls', []);

chloeCtrls.controller('HelloCtrl', ['$scope',
	function($scope) {
		$scope.greeting = {
			text: 'Hello'
		}
	}
]);

chloeCtrls.controller('ListCtrl', ['$scope',
	function($scope) {
		$scope.lists = [
			{title:'AAA', author:'aaa'},
			{title:'BBB', author:'bbb'},
			{title:'CCC', author:'ccc'}
		]
	}
]);