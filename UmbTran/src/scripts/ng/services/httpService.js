(function () {
    'use strict';

    angular.module('ngMain')
      .factory('httpService', httpService);

    httpService.$inject = ['$http'];

    function httpService($http) {

        var service = {
            getPublicJson: getPublicJson,
            urlBasePublic: 'https://poloniex.com/public?command='
        };

        return service;

        function getPublicJson(url) {
            url = service.urlBasePublic + url;
            return $http.get(url)
              .then(function (response) {
                  return response.data;
              });
        }
    }
}());
