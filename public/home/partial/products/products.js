angular.module('home').controller('ProductsCtrl',function($scope, productsService){

    $scope.products = angular.copy(productsService.products);
    $scope.data = {};

});
