function HomeController($scope, StudentService, $timeout, $firebaseArray) {

    $scope.title = "Students";

    $scope.showAddForm = false;
    $scope.showEditForm = false;
    $scope.showList = true;
    $scope.showAddBtn = true;

    $scope.alertSuccess = function () {
        $scope.showAlertSuccess = true;
        $timeout(function () {
            $scope.showAlertSuccess = false;
        }, 5000);
    };

    $scope.alertError = function () {
        $scope.showAlertError = true;
        $timeout(function () {
            $scope.showAlertError = false;
        }, 5000);
    };

    $scope.create = function () {
        $scope.showAddForm = true;
        $scope.showList = false;
        $scope.showAddBtn = false;

        $scope.store = function () {
            var ref = firebase.database().ref("students");
            $firebaseArray(ref).$add($scope.formDataModel)
                .then(function (ref) {
                        $scope.formDataModel.name = "";
                        $scope.formDataModel.email = "";
                    }, function (error) {
                        console.log(error);
                    }
                )
        };
    };

    $scope.edit = function (formDataModel, currentPage, perPage) {
        $scope.showEditForm = true;
        $scope.showList = false;
        $scope.showAddBtn = false;

        $scope.formDataModel = angular.copy(formDataModel);

        $scope.update = function () {
            StudentService.update({page: currentPage, perPage: perPage}, $scope.formDataModel,
                function (data) {
                    $scope.successMessage = data.successMessage;
                    $scope.items = data.items;
                    $scope.showEditForm = false;
                    $scope.showList = true;
                    $scope.showAddBtn = true;
                    $scope.alertSuccess();
                },
                function (error) {
                    $scope.errors = error.data.errors;
                    $scope.errorMessage = error.data.errorMessage;
                    $scope.alertError();
                }
            );
        };
    };

    $scope.close = function () {
        $scope.showAddForm = false;
        $scope.showEditForm = false;
        $scope.showList = true;
        $scope.showAddBtn = true;
    };
}