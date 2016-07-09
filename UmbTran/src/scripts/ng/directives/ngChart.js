(function() {
  'use strict';
    angular.module('ngMain')
      .directive('ngChart', ngChart);

      function ngChart(){
          var directive = {
            template: '<canvas id="canv-chart" width="400" height="400"></canvas>'
          };

          return directive;
      }

}());
