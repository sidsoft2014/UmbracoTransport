(function () {
    'use strict';

    angular.module('ngMain')
        .service('chartService', chartService);

    chartService.$inject = ['httpService'];

    function chartService(httpService) {
        var service = {
            initialise: initialise
        };

        return service;

        function initialise(marketId) {
            var url = 'returnChartData'
                + '&currencyPair=MARKET'
                + '&start=1405699200'
                + '&end=9999999999'
                + '&period=86400';
            url = url.replace('MARKET', marketId);
            httpService.getPublicJson(url)
            .then(function (response) {
                var chartDataset = response;
                buildChart(chartDataset);
            });
        }
    }
})();