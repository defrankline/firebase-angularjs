var app = angular.module('app', ['ui.router','services','ngResource','firebase','ngTouch','ngAnimate','ui.bootstrap']);

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

app.factory("ConfirmDialogService", ["$q", "$uibModal", function ($q, $uibModal) {
    var _showConfirmDialog = function (title, message) {
        var defer = $q.defer();

        var modalInstance = $uibModal.open({
            animation: true,
            size: "lg",
            backdrop: false,
            templateUrl: '/templates/confirm-dialog.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.title = title;
                $scope.message = message;

                $scope.ok = function () {
                    $uibModalInstance.close();
                    defer.resolve();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                    defer.reject();
                };
            }
        });

        return defer.promise;
    };

    return {
        showConfirmDialog: _showConfirmDialog
    };

}]);