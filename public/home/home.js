angular.module('home', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('home').config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'home/partial/login/login.html',
        controller: 'LoginCtrl',
        resolve: {
            checkSession: ['$state', 'sessionService', function ($state, sessionService) {
                sessionService.getSessionUser().then(function (data) {
                    if (data._id) {
                        $state.go('common.products');
                    }
                });
            }]
        }
    });
    $stateProvider.state('common', {
        url: '/admin',
        abstract: true,
        templateUrl: 'home/partial/common/common.html',
        controller: 'CommonCtrl',
        resolve: {
            checkSession: ['$state', 'sessionService', function ($state, sessionService) {
                sessionService.getSessionUser().then(function (data) {
                    if (!data._id) {
                        $state.go('login');
                    }
                });
            }]
        }
    });
    $stateProvider.state('common.products', {
        url: '/products',
        templateUrl: 'home/partial/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            products: ['checkSession', 'productsService', function (checkSession, productsService) {
                return productsService.getProductsList();
            }]
        }
    });

    $stateProvider.state('common.edit-product', {
        url: '/:productId',
        templateUrl: 'home/partial/edit-product/edit-product.html',
        controller: 'EditProductCtrl'
    });

});

