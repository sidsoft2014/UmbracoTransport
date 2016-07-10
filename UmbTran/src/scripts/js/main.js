function buildChart(vm) {
    var ctx = document.createElement('canvas');
    ctx.id = "canv-chart";
    ctx.className = "js-chart chart-canvas";

    var panel = document.getElementsByClassName('js-chart-panel')[0];
    panel.innerHTML = "";
    panel.appendChild(ctx);

    var labels = [];
    var prices = [];

    for (var i = 0; i < vm.dataset.length; i++) {
        var item = vm.dataset[i];
        var date = new Date(item.date * 1000);
        labels.push(date);
        prices.push(item.close);
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Closing Price: ' + vm.marketName,
                data: prices
            }]
        },
        options: {
            responsive: true
        }
    });
}
