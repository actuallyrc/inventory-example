angular.module('home').controller('CommonCtrl',function($scope, sessionService, $state){

    $scope.user = sessionService.user;
    $scope.logout = function () {
        sessionService.logout().then(function () {
            $scope.user = {};
            $state.go('login');
        });
    };
});
