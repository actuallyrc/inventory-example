angular.module('public').factory('sessionService',function($http, $q) {

    var sessionService = {};
    sessionService.user={};

    sessionService.logout = function () {
        var deferred = $q.defer();
        $http.get('/api/auth/signout')
            .then(function (sData) {
                if (sData) {
                    sessionService.user = {};
                    deferred.resolve();
                } else {
                    deferred.resolve();
                }
            }, function (eData) {
                deferred.reject();
            });

        return deferred.promise;

    };

    sessionService.getSessionUser = function () {
        var deferred = $q.defer();
        $http.get('/api/users/me')
            .then(function (sData) {
                if (sData.data && sData.data._id) {
                    sessionService.user = sData.data;
                    deferred.resolve(sessionService.user);
                } else {
                    sessionService.user = {};
                    deferred.resolve(sessionService.user);
                }
            }, function (eData) {
                deferred.reject();
            });

        return deferred.promise;
    };

    return sessionService;
});
