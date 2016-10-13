function displayCharts(modelData, seasonStats) {
    var data = [];
    modelData.forEach(function(d) {
        data.push(d.fields);
    });

    var WIDTH = 480,
    HEIGHT = 150;

    var maxAvg = 0;
    var maxOps = 0;

    data.forEach(function(d, i) {
      var splitDate = d.game_date.split('T');  
      d.date = d3.time.format("%Y-%m-%d").parse(splitDate[0]);
      d.ab = +d.ab;
      d.h = +d.h;
      d.bb = +d.bb;
      d.avg = parseFloat(d.avg);
      d.war = parseFloat(d.war);
      d.index = +d.index;
      d.hbp = +d.hbp;
      d.single = +d.single;
      d.double = +d.double;
      d.triple = +d.triple;
      d.hr = +d.hr;
      d.sf = +d.sf;
      maxAvg = d.avg > maxAvg ? d.avg : maxAvg;
      maxOps = (d.slg + d.obp) > maxOps ? (d.slg + d.obp) : maxOps;
    });
    $("#selected-hits").text("Hits: " + seasonStats[0].fields.h);
    $("#selected-avg").text("Avg: " + seasonStats[0].fields.avg);
    $("#selected-ops").text("Ops: " + seasonStats[0].fields.ops);

    var playerData = crossfilter(data),
        dateDim = playerData.dimension(function(d) {
            return d.date;
        }),
        abDim = playerData.dimension(function(d) {
            return d.ab;
        }),
        hitDim = playerData.dimension(function(d) {
            return d.h;
        });

    var absGroupByDate = dateDim.group().reduceSum(function(d) {
        return d.ab
    });
    var abGroup = abDim.group();
    var dateGroup = dateDim.group();

    var x_domain = d3.extent(data, function(d) {
        return d.date;
    });
    var x_scale = d3.time.scale();
    x_scale.domain(x_domain);

    //Ab chart
    var abChart = dc.barChart("#ab-bar-chart");
    abChart
        .width(WIDTH + 320)
        .height(HEIGHT + 30)
        .x(x_scale)
        .xUnits(function() {
            return 140;
        })
        .y(d3.scale.linear().domain([0, d3.max(data, function(d) {
            return d.ab
        })]))
        .yAxisLabel("At Bats")
        .centerBar(true)
        .colors("#1754A2")
        .dimension(dateDim)
        .alwaysUseRounding(true)
        .group(absGroupByDate);

    abChart.elasticX(true);
    abChart.xAxisPadding(1);
    abChart.xAxis().tickFormat(d3.time.format("%b %d")).ticks(d3.time.days, 20);
    abChart.yAxis().tickFormat(d3.format("d"));
    abChart.render();

    //Hit chart
    var hitChart = dc.barChart("#hit-bar-chart");

    function regularize_groupAll(groupAll) {
        return {
            all: function() {
                return [{
                    key: 'all',
                    value: groupAll.value()
                }];
            }
        };
    }

    function hitReduceAdd(p, v) {
        p.h += v.h;
        return p;
    }

    function hitReduceRemove(p, v) {
        p.h -= v.h;
        return p;
    }

    function hitReduceInitial() {
        return {
            h: 0
        };
    }

    var allHits = abDim.groupAll().reduce(hitReduceAdd, hitReduceRemove, hitReduceInitial);
    var totalHits = allHits.value().h;
    var regAllHits = regularize_groupAll(allHits);
    var selectedHits = 0;

    hitChart
        .width(200)
        .height(HEIGHT + 30)
        .x(d3.scale.ordinal().domain(["Hits"]))
        .xUnits(dc.units.ordinal)
        .y(d3.scale.linear().domain([0, totalHits]))
        .yAxisLabel("")
        .centerBar(true)
        .colors("#1754A2")
        .dimension(abDim)
        .brushOn(false)
        .alwaysUseRounding(true)
        .group(regAllHits)
        .valueAccessor(function(p){
            selectedHits = p.value.h
            return selectedHits;
        })
        .on("postRedraw", updateHits);

        function updateHits(){
            $("#selected-hits").text("Hits: " + selectedHits);
        }


    hitChart.render();

    //Avg chart
    var avgChart = dc.barChart("#avg-chart");

    function avgReduceAdd(p, v) {
        p.count += v.ab;
        p.total += v.h;
        return p;
    }

    function avgReduceRemove(p, v) {
        p.count -= v.ab;
        p.total -= v.h;
        return p;
    }

    function avgReduceInitial() {
        return {
            count: 0,
            total: 0
        };
    }

    var allAvg = abDim.groupAll().reduce(avgReduceAdd, avgReduceRemove, avgReduceInitial);
    var totalAvg = allAvg.value()
    var regTotalAvg = regularize_groupAll(allAvg);
    var selectedAvg = 0;

    avgChart
        .width(200)
        .height(HEIGHT + 30)
        .x(d3.scale.ordinal().domain(["Avg"]))
        .xUnits(dc.units.ordinal)
        .y(d3.scale.linear().domain([0, maxAvg]))
        .yAxisLabel("")
        .elasticY(true)
        .centerBar(true)
        .colors("#1754A2")
        .dimension(abDim)
        .brushOn(false)
        .alwaysUseRounding(true)
        .group(regTotalAvg)
        .valueAccessor(function(p) {
            selectedAvg = p.value.count > 0 ? (p.value.total / p.value.count).toFixed(3) : 0
            return selectedAvg
        })
        .on("postRedraw", updateAvg);

        function updateAvg(){
            $("#selected-avg").text("Avg: " + selectedAvg)
        }

    dc.override(avgChart, 'yAxisMax', function() { 
        return Number(avgChart._yAxisMax()) + .1; 
    });

    avgChart.render();

    //Ops chart
    var opsChart = dc.barChart("#ops-chart");

    function opsReduceAdd(p, v) {
        p.ab += v.ab;
        p.h += v.h;
        p.bb += v.bb;
        p.single += v.single;
        p.double += v.double;
        p.triple += v.triple;
        p.hr += v.hr;
        p.hbp += v.hbp;
        p.sf += v.sf;
        return p;
    }

    function opsReduceRemove(p, v) {
        p.ab -= v.ab;
        p.h -= v.h;
        p.bb -= v.bb;
        p.single -= v.single;
        p.double -= v.double;
        p.triple -= v.triple;
        p.hr -= v.hr;
        p.hbp -= v.hbp;
        p.sf -= v.sf;
        return p;
    }

    function opsReduceInitial() {
        return {
            ab: 0,
            h: 0,
            bb: 0,
            single: 0,
            double: 0,
            triple: 0,
            hr: 0,
            hbp: 0,
            sf: 0
        };
    }

    var allOps = abDim.groupAll().reduce(opsReduceAdd, opsReduceRemove, opsReduceInitial);
    var regTotalOps = regularize_groupAll(allOps);
    var selectedOps = 0;

    opsChart
        .width(200)
        .height(HEIGHT + 30)
        .x(d3.scale.ordinal().domain(["Ops"]))
        .xUnits(dc.units.ordinal)
        .y(d3.scale.linear().domain([0, maxOps]))
        .yAxisLabel("")
        .elasticY(true)
        .colors("#1754A2")
        .centerBar(true)
        .dimension(abDim)
        .brushOn(false)
        .alwaysUseRounding(true)
        .group(regTotalOps)
        .valueAccessor(function(p) {
            if(p.value.ab > 0){
                var obp = (p.value.h + p.value.bb  + p.value.hbp) / (p.value.ab + p.value.bb + p.value.hbp + p.value.sf);
                var slg =  (p.value.single + (2 * p.value.double) + (3 * p.value.triple) + (4 * p.value.hr)) / p.value.ab;
                selectedOps = (obp + slg).toFixed(3);
                return selectedOps;
            }
            else
                return 0;
        })
        .on("postRedraw", updateOps);

        function updateOps(){
            $("#selected-ops").text("OPS: " + selectedOps);
        }

    dc.override(opsChart, 'yAxisMax', function() { 
        return Number(opsChart._yAxisMax()) + .3; 
    });

    // dc.override(opsChart, 'yAxisMin', function() {
    //     var min = d3.min(opsChart.data(), function (e) {
    //         return opsChart.valueAccessor()(e);
    //     });
    //     return min;
    // });

    // dc.override(opsChart, 'yAxisMin', function() {
    //     // var min = d3.min(opsChart.data(), function (e) {
    //     //     return opsChart.valueAccessor()(e);
    //     // });
    //     // return min;
    //     return 0;
    // });

    // _chart.yAxisMin = function () {
    //     var min = d3.min(_chart.data(), function (e) {
    //         return _chart.valueAccessor()(e);
    //     });
    //     return dc.utils.subtract(min, _yAxisPadding);
    // };

    // dc.override(opsChart, '_prepareYAxis', function(g){
    //     if (opsChart._y === undefined || opsChart.elasticY()) {
    //         opsChart._y = d3.scale.linear();
    //         var min = opsChart.yAxisMin() || 0,
    //             max = (opsChart.yAxisMax() + 3) || 0;
    //         opsChart._y.domain([min, max]).rangeRound([opsChart.yAxisHeight(), 0]);
    //     }

    //     opsChart._y.range([opsChart.yAxisHeight(), 0]);
    //     opsChart._yAxis = opsChart._yAxis.scale(opsChart._y);

    //     if (opsChart._useRightYAxis) {
    //         opsChart._yAxis.orient('right');
    //     }

    //     opsChart._renderHorizontalGridLinesForAxis(g, _y, _yAxis);
    // })

    // _chart._prepareYAxis = function (g) {
    //     if (_y === undefined || _chart.elasticY()) {
    //         _y = d3.scale.linear();
    //         var min = _chart.yAxisMin() || 0,
    //             max = _chart.yAxisMax() || 0;
    //         _y.domain([min, max]).rangeRound([_chart.yAxisHeight(), 0]);
    //     }

    //     _y.range([_chart.yAxisHeight(), 0]);
    //     _yAxis = _yAxis.scale(_y);

    //     if (_useRightYAxis) {
    //         _yAxis.orient('right');
    //     }

    //     _chart._renderHorizontalGridLinesForAxis(g, _y, _yAxis);
    // };

    opsChart.render();
}
