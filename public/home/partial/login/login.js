angular.module('home').controller('LoginCtrl',function($scope, sessionService, $http, $state, $timeout){

    $scope.user = {};
    $scope.submitted = false;

    $scope.login = function (valid) {
        $scope.submitted = true;
        if (valid) {
            $http.post('/api/auth/signin', $scope.user).success(function (data) {
                sessionService.user = data.user;
                $state.go('common.products');
            }).error(function (error) {
                $scope.errorMsg = error.message;
                $timeout(function () {
                    $scope.errorMsg = '';
                }, 3000);
            });
        }
    };
});
