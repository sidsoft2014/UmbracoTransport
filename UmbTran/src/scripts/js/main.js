function buildChart(dataset) {
    var panel = document.getElementsByClassName('js-chart-panel')[0];
    panel.innerHTML = "";

    var chartData = [];
    for (var i = 0; i < dataset.length; i++) {
        var item = dataset[i];
        var dateObj = new Date(item.date * 1000);
        var year = dateObj.getFullYear();
        var month = parseInt(dateObj.getMonth() + 1).toString();
        var day = dateObj.getDate();

        if (month.length === 1)
            month = '0' + month;

        if (day.length === 1)
            day = '0' + day;

            var date = year  + "-" + month + "-" + day;

        chartData.push({
            "date": date,
            "open": item.open * 1000,
            "high": item.high * 1000,
            "low": item.low * 1000,
            "close": item.close * 1000
        });
    }
    console.log(chartData);

    var chart = AmCharts.makeChart("js-chart-panel", {
        "type": "serial",
        "theme": "dark",
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "proCandlesticks": true,
            "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
            "closeField": "close",
            "fillColors": "#7f8da9",
            "highField": "high",
            "lineColor": "#7f8da9",
            "lineAlpha": 1,
            "lowField": "low",
            "fillAlphas": 0.9,
            "negativeFillColors": "#db4c3c",
            "negativeLineColor": "#db4c3c",
            "openField": "open",
            "title": "Price:",
            "type": "candlestick",
            "valueField": "close"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "graphType": "line",
            "scrollbarHeight": 30
        },
        "chartCursor": {
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true
        },
        "dataProvider": chartData,
        "export": {
            "enabled": true,
            "position": "bottom-right"
        }
    });

    $('.js-chart-container').show();
    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chart.dataProvider.length - 50, chart.dataProvider.length - 1);
    }
}
