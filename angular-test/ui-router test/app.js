var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/PageTab");

     $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "view/PageTab.html"
        })
        .state("PageTab.Page1", {
            url:"/Page1",
            templateUrl: "view/Page1.html"
        })
        .state("PageTab.Page2", {
            url:"/Page2",
            templateUrl: "view/Page2.html"
        })
        .state("PageTab.Page3", {
            url:"/Page3",
            templateUrl: "view/Page3.html"
        });
});