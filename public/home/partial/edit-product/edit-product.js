angular.module('home').controller('EditProductCtrl',function($scope, productsService, $timeout, $state, Upload){

    $scope.product={};
    $scope.submitted= false;

    $scope.saveProduct = function (valid) {
        $scope.submitted= true;
        if(valid) {
            function save() {
                productsService.createProduct($scope.product).then(function (success) {
                    $scope.successMsg= success.message;
                    $scope.submitted= false;
                    $timeout(function () {
                        $state.go('common.products');
                    }, 3000);
                }, function (error) {
                    $scope.errorMsg= error.data.message;
                });
            }
            if(typeof $scope.product.image=='object') {
                Upload.upload({
                    url: '/api/files',
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    file: $scope.product.image
                }).progress(function (evt) {
                    $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + $scope.progressPercentage + '% ' +
                        evt.config.file.name);
                }).success(function (data, status, headers, config) {
                        $scope.product.image= data.image;
                        save();
                });
            } else {
                save();
            }

        }
    };

    $scope.reset = function () {
        $scope.product={};
        $scope.submitted= false;
    };


});
