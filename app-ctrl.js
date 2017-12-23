(function () {
    'use strict';
    app.controller('AppController', AppController);
    AppController.$inject = ['$scope','$http', '$window'];

    function AppController($scope) {
        $scope.app_name = "Angularjs + Firebase"
    }
})();