function displayCharts(modelData, seasonStats) {

  var WIDTH = 480,
    HEIGHT = 150;

  var data = [];
  modelData.forEach(function(d) {;
    data.push(d.fields);
  });

  var totalIp = 0;
  data.forEach(function(d, i) {
    var splitDate = d.game_date.split('T');  
    d.game_date = d3.time.format("%Y-%m-%d").parse(splitDate[0]);
    var splitIp = d.ip.toString().split('.');
    //partial ip denoted by .1 for 1 out of 3 outs, and .2 for 2 out of 3, adjust accordingly
    if(splitIp.length == 2) {
      var test = +splitIp[0] + (+splitIp[1] * .33)
      d.ip = +splitIp[0] + (+splitIp[1] * .33)
    } else {
      d.ip = parseFloat(d.ip);
     }
  });

  var m = "";

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

  var bfGroup = playerData.groupAll().reduceSum(function(d){
    return d.bf;
  })

  var bbGroup = playerData.groupAll().reduceSum(function(d){
    return d.bb;
  })

  var totalBattersFaced = bfGroup.value();
  var totalWalks = bbGroup.value();
  $("#selected-whip").text("Whip: " + seasonStats[0].fields.whip);
  $("#selected-k-ratio").text("K-ratio: " + (seasonStats[0].fields.k / totalBattersFaced).toFixed(2) + "%");
  $("#selected-bb-ratio").text("BB-ratio: " + (totalWalks / totalBattersFaced).toFixed(2) + "%");
  $("#selected-era").text("ERA: " + seasonStats[0].fields.era);


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
  var selectedWhip = 0;

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
        selectedWhip = ((p.value.h + p.value.bb) / p.value.ip).toFixed(2);
        return selectedWhip;
      } else
        selectedWhip = 0;
        return selectedWhip;
    })
    .on("postRedraw", updateWhip);

    function updateWhip() {
      $("#selected-whip").text("Whip: " + selectedWhip);
    }

  dc.override(whipChart, 'yAxisMax', function() {
    return Number(whipChart._yAxisMax()) + .5;
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
  var selectedKRatio = 0;

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
        selectedKRatio = (p.value.k / p.value.bf).toFixed(2);
        return selectedKRatio;
      } else
        selectedKRatio = 0;
        return selectedKRatio;
    })
    .on("postRedraw", updateKRatio);

    function updateKRatio(){
      $("#selected-k-ratio").text("K-ratio: " + selectedKRatio + "%");
    }

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
  var selectedBBRatio = 0;

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
        selectedBBRatio = (p.value.bb / p.value.bf).toFixed(2);
        return selectedBBRatio;
      } else
        selectedBBRatio = 0;
        return selectedBBRatio;
    })
    .on("postRedraw", updateBBRatio);

    function updateBBRatio() {
      $("#selected-bb-ratio").text("BB-ratio: " + selectedBBRatio + "%");
    }

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

  var allEra = ipDim.groupAll().reduce(eraReduceAdd, eraReduceRemove, eraReduceInitial);
  var regTotalERA = regularize_groupAll(allEra);
  var selectedEra = 0;

  eraChart
    .width(150)
    .height(HEIGHT + 30)
    .x(d3.scale.ordinal().domain(["ERA"]))
    .xUnits(dc.units.ordinal)
    .y(d3.scale.linear().domain([0, 5]))
    .yAxisLabel("")
    .elasticY(true)
    .colors("#1754A2")
    .centerBar(true)
    .dimension(ipDim)
    .brushOn(false)
    .alwaysUseRounding(true)
    .group(regTotalERA)
    .valueAccessor(function(p) {
      if (p.value.ip > 0) {
        selectedEra = ((p.value.er / p.value.ip) * 9).toFixed(2);
        return selectedEra;
      } else
        selectedEra = 0;
        return selectedEra;
    })
    .on("postRedraw", updateEra);

    function updateEra() {
      $("#selected-era").text("ERA: " + selectedEra)
    }

  dc.override(eraChart, 'yAxisMax', function() {
    return Number(eraChart._yAxisMax()) + .5;
  });

  eraChart.render();

}