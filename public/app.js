angular.module('public', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngFileUpload', 'home']);

angular.module('public').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/admin/products');

});

angular.module('public').run(function($rootScope, $state, $stateParams) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    /* =================== for ui-sref active class based on state name starts ==================== */
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
    /* =================== for ui-sref active class based on state name ends ==================== */

});
