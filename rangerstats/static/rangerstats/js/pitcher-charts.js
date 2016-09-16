function displayCharts(modelData) {

  var WIDTH = 480,
    HEIGHT = 150;

  var data = [];
  modelData.forEach(function(d) {;
    data.push(d.fields);
  });

  data.forEach(function(d, i) {
    //d.game_date = d3.time.format("%Y-%m-%d").parse(d.game_date);
    var splitDate = d.game_date.split('T');  
    d.game_date = d3.time.format("%Y-%m-%d").parse(splitDate[0]);
  });

  var playerData = crossfilter(data);

  var dateDim = playerData.dimension(function(d) {
    return d.game_date;
  });

  var ipDim = playerData.dimension(function(d) {
    return d.ip;
  });

  var ipGroupByDate = dateDim.group().reduceSum(function(d) {
    return d.ip;
  });

  var ipChart = dc.barChart("#ip-chart");

  var x_domain = d3.extent(data, function(d) {
    return d.game_date;
  });
  var x_scale = d3.time.scale();
  x_scale.domain(x_domain);

  ipChart
    .width(WIDTH + 320)
    .height(HEIGHT + 30)
    .x(x_scale)
    .xUnits(function() {
      return 50;
    })
    .y(d3.scale.linear().domain([0, 9]))
    .yAxisLabel("Innings Pitched")
    .centerBar(true)
    .colors("#1754A2")
    .dimension(dateDim)
    .alwaysUseRounding(true)
    .group(ipGroupByDate);

  ipChart.elasticX(true);
  ipChart.xAxisPadding(1);
  ipChart.xAxis().tickFormat(d3.time.format("%b %d")).ticks(d3.time.days, 18);
  ipChart.yAxis().tickFormat(d3.format("d"));
  ipChart.render();

  var whipChart = dc.barChart("#whip-chart");

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

  function whipReduceAdd(p, v) {
    p.h += v.h;
    p.bb += v.bb;
    p.ip += v.ip;
    return p;
  }

  function whipReduceRemove(p, v) {
    p.h -= v.h;
    p.bb -= v.bb;
    p.ip -= v.ip;
    return p;
  }

  function whipReduceInitial() {
    return {
      h: 0,
      bb: 0,
      ip: 0
    };
  }

  var allWhip = ipDim.groupAll().reduce(whipReduceAdd, whipReduceRemove, whipReduceInitial);
  var regTotalWhip = regularize_groupAll(allWhip);

  whipChart
    .width(150)
    .height(HEIGHT + 30)
    .x(d3.scale.ordinal().domain(["Whip"]))
    .xUnits(dc.units.ordinal)
    .y(d3.scale.linear().domain([0, 3]))
    .yAxisLabel("")
    .colors("#1754A2")
    .centerBar(true)
    .dimension(ipDim)
    .brushOn(false)
    .alwaysUseRounding(true)
    .group(regTotalWhip)
    .valueAccessor(function(p) {
      if (p.value.ip > 0) {
        var whip = (p.value.h + p.value.bb) / p.value.ip;;
        return whip
      } else
        return 0;
    });

  whipChart.render();

  var kRatioChart = dc.barChart("#k-ratio-chart");

  function kRatioReduceAdd(p, v) {
    p.k += v.k
    p.bf += v.bf;
    return p;
  }

  function kRatioRemove(p, v) {
    p.k -= v.k;
    p.bf -= v.bf;
    return p;
  }

  function kRatioReduceInitial() {
    return {
      k: 0,
      bf: 0,
    };
  }

  var allKRatio = ipDim.groupAll().reduce(kRatioReduceAdd, kRatioRemove, kRatioReduceInitial);
  var regTotalKRatio = regularize_groupAll(allKRatio);

  kRatioChart
    .width(150)
    .height(HEIGHT + 30)
    .x(d3.scale.ordinal().domain(["K%"]))
    .xUnits(dc.units.ordinal)
    .y(d3.scale.linear().domain([0, 1]))
    .yAxisLabel("")
    .colors("#1754A2")
    .centerBar(true)
    .dimension(ipDim)
    .brushOn(false)
    .alwaysUseRounding(true)
    .group(regTotalKRatio)
    .valueAccessor(function(p) {
      if (p.value.bf > 0) {
        return p.value.k / p.value.bf;
      } else
        return 0;
    });

  kRatioChart.render();

  var bbRatioChart = dc.barChart("#bb-ratio-chart");

  function bbRatioReduceAdd(p, v) {
    p.bb += v.bb
    p.bf += v.bf;
    return p;
  }

  function bbReduceRatioRemove(p, v) {
    p.bb -= v.bb;
    p.bf -= v.bf;
    return p;
  }

  function bbRatioReduceInitial() {
    return {
      bb: 0,
      bf: 0,
    };
  }

  var allBBRatio = ipDim.groupAll().reduce(bbRatioReduceAdd, bbReduceRatioRemove, bbRatioReduceInitial);
  var regTotalBBRatio = regularize_groupAll(allBBRatio);

  bbRatioChart
    .width(150)
    .height(HEIGHT + 30)
    .x(d3.scale.ordinal().domain(["BB%"]))
    .xUnits(dc.units.ordinal)
    .y(d3.scale.linear().domain([0, 1]))
    .yAxisLabel("")
    .colors("#1754A2")
    .centerBar(true)
    .dimension(ipDim)
    .brushOn(false)
    .alwaysUseRounding(true)
    .group(regTotalBBRatio)
    .valueAccessor(function(p) {
      if (p.value.bf > 0) {
        return p.value.bb / p.value.bf;
      } else
        return 0;
    });

  bbRatioChart.render();

  var eraChart = dc.barChart("#era-chart");

  function eraReduceAdd(p, v) {
    p.er += v.er
    p.ip += v.ip;
    return p;
  }

  function eraReduceRemove(p, v) {
    p.er -= v.er;
    p.ip -= v.ip;
    return p;
  }

  function eraReduceInitial() {
    return {
      er: 0,
      ip: 0,
    };
  }

  var allera = ipDim.groupAll().reduce(eraReduceAdd, eraReduceRemove, eraReduceInitial);
  var regTotalERA = regularize_groupAll(allera);

  eraChart
    .width(150)
    .height(HEIGHT + 30)
    .x(d3.scale.ordinal().domain(["ERA"]))
    .xUnits(dc.units.ordinal)
    .y(d3.scale.linear().domain([0, 5]))
    .yAxisLabel("")
    .colors("#1754A2")
    .centerBar(true)
    .dimension(ipDim)
    .brushOn(false)
    .alwaysUseRounding(true)
    .group(regTotalERA)
    .valueAccessor(function(p) {
      if (p.value.ip > 0) {
        return (p.value.er / p.value.ip) * 9;
      } else
        return 0;
    });

  eraChart.render();

}