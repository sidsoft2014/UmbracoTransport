(function() {
  'use strict';

    angular.module('ngMain')
      .controller('chartController', chartController);

      chartController.$inject = ['httpService']

    function chartController(httpService){
      var vm = this;

      vm.dataset = [];
      vm.marketName = '';
      vm.marketId = '';
      vm.setMarket = setMarket;

      function setMarket(market){
        vm.marketId = market.id;
        vm.marketName = market.name;
        getData();
      }

      function getData(){
        var url = 'https://poloniex.com/public?command=returnChartData&currencyPair=MARKET&start=1405699200&end=9999999999&period=86400';
        url = url.replace('MARKET', vm.marketId);
        httpService.getJson(url)
          .then(function (response) {
            vm.dataset = response;
            buildChart(vm.dataset);
          });
      }


    }

}());
