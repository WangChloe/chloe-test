/*! chloe-test 2016-10-18 */
var myModule=angular.module("MyMoudle",[]);myModule.directive("hello",function(){return{restrict:"E",template:"<div>Hi everyone!</div>",replace:!0}});