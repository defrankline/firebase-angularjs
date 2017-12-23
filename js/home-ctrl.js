function HomeController($scope, StudentService, $timeout, $firebaseArray, $firebaseObject, ConfirmDialogService) {

    $scope.title = "Students";

    var ref = firebase.database().ref("students");
    $scope.items = $firebaseArray(ref);

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
            $firebaseArray(ref).$add($scope.formDataModel).then(function (ref) {
                    $scope.formDataModel.name = "";
                    $scope.formDataModel.email = "";
                    $scope.showAddForm = false;
                    $scope.showList = true;
                    $scope.showAddBtn = true;
                    $scope.successMessage = "Student Added Successfully!";
                    $scope.alertSuccess();
                }, function (error) {
                    $scope.errorMessage = "Student Could not be Added!";
                    console.log(error);
                    $scope.alertError();
                }
            )
        };
    };

    $scope.edit = function (formDataModel) {
        $scope.showEditForm = true;
        $scope.showList = false;
        $scope.showAddBtn = false;
        $scope.formDataModel = angular.copy(formDataModel);
        $scope.id = $scope.formDataModel.$id;
        $scope.update = function () {
            var ref = firebase.database().ref("students/" + $scope.id);
            ref.update({
                name: $scope.formDataModel.name,
                email: $scope.formDataModel.email,
            }).then(function (ref) {
                    $scope.formDataModel.name = "";
                    $scope.formDataModel.email = "";
                    $scope.showEditForm = false;
                    $scope.showList = true;
                    $scope.showAddBtn = true;
                    $scope.successMessage = "Student Updated Successfully!";
                    $scope.alertSuccess();
                }, function (error) {
                    $scope.errorMessage = "Student Could not be Updated!";
                    console.log(error);
                    $scope.alertError();
                }
            )
        };
    };


    $scope.delete = function (item) {
        $scope.items.$remove(item).then(function (ref) {

            }, function () {

            }
        )
    };


    $scope.close = function () {
        $scope.showAddForm = false;
        $scope.showEditForm = false;
        $scope.showList = true;
        $scope.showAddBtn = true;
    };
}