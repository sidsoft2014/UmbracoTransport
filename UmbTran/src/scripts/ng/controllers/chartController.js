(function () {
    'use strict';

    angular.module('ngMain')
      .controller('chartController', chartController);

    chartController.$inject = ['httpService']

    function chartController(httpService) {
        var vm = this;

        vm.chartDataset = [];
        vm.marketName = '';
        vm.marketId = '';
        vm.setMarket = setMarket;

        function setMarket(market) {
            vm.marketId = market.id;
            vm.marketName = market.name;
            getChartData();
        }

        function getChartData() {
            var url = 'returnChartData&currencyPair=MARKET&start=1405699200&end=9999999999&period=86400';
            url = url.replace('MARKET', vm.marketId);
            httpService.getPublicJson(url)
            .then(function (response) {
                vm.chartDataset = response;
                buildChart(vm.chartDataset);
            });
        }
    }

}());
