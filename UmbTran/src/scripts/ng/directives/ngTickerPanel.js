(function() {
    'use strict';

    angular
        .module('ngMain')
        .directive('ngTickerPanel', ngTickerPanel);

    ngTickerPanel.$inject = ['$window', 'httpService', 'chartService'];

    function ngTickerPanel($window, httpService, chartService) {
        var directive = {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                src: "="
            },
            controller: function ($scope) {
                $scope.tickers = [];

                httpService.getPublicJson('returnTicker')
                .then(function (response) {
                    $scope.tickers = [];
                    var keys = Object.keys(response);
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        var item = response[key];
                        $scope.tickers.push({
                            name: key,
                            lastPrice: item.last
                        });
                    }
                });

                $scope.setMarket = function (market) {
                    chartService.initialise(market.name);
                };
            },
            templateUrl: './src/scripts/ng/partials/tickerpanel.html'
        };

        return directive;
    }

})();
