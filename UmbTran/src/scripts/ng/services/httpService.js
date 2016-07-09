(function() {
  'use strict';

    angular.module('ngMain')
      .service('httpService', httpService);

      httpService.$inject = ['$http'];

      function httpService($http){

        var service = {
          getJson: getJson
        };

        return service;

        function getJson(url) {
          return $http.get(url)
            .then(function(response){
              return response.data;
            });
        }
      }
}());
