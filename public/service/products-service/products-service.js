angular.module('public').factory('productsService',function($http, $q) {

    var productsService = {};
    productsService.products = [];


    productsService.getProductsList = function () {
        var deferred = $q.defer();
        $http.get('/api/products')
            .then(function (sData) {
                productsService.products = sData.data;
                deferred.resolve(sData.data);
            }, function (eData) {
                deferred.reject(eData);
            });
        return deferred.promise;
    };

    productsService.createProduct = function (data) {
        var deferred = $q.defer();
        $http.post('/api/product', data)
            .then(function (sData) {
                deferred.resolve(sData.data);
            }, function (eData) {
                deferred.reject(eData);
            });
        return deferred.promise;
    };

    return productsService;
});
