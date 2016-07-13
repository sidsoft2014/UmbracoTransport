(function () {
    'use strict';

    angular
        .module('ngMain')
        .controller('tickerController', tickerController);

    tickerController.$inject = ['$location']; 

    function tickerController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'tickerController';

        activate();

        function activate() { }
    }
})();
