var app = angular.module('app', ['ui.router','services','ngResource','firebase']);

app.config(function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    var homeState = {
        name: 'home',
        url: '/home',
        templateUrl:"/templates/home.html",
        controller:HomeController
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl:"/templates/about.html",
        controller:AboutController
    };

    $stateProvider.state(homeState);
    $stateProvider.state(aboutState);
    $stateProvider.state("otherwise", {url: '/home'});
});