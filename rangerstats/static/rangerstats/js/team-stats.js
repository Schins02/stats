$(function() {
  $("#team-stats").addClass("active");

  var bsSwitch = $("#table-switch");
  $(bsSwitch).bootstrapSwitch();
  $(bsSwitch).bootstrapSwitch("onColor", "red");
  $(bsSwitch).bootstrapSwitch("offColor", "blue");
  $(bsSwitch).on("switchChange.bootstrapSwitch", function(event, state) {
    if (state) {
      $("#hitting-stats-container").css("display", "");
      $("#pitching-stats-container").css("display", "none");
    } else {
      $("#hitting-stats-container").css("display", "none");
      $("#pitching-stats-container").show();
    }
  });

  var rangersColor = "#1754A2";
  var astrosColor = "#FF6600";
  var marinersColor = "#101B53";
  var athleticsColor = "#014132";
  var angelsColor = "#C40002";

  Highcharts.chart('ops-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Team OPS'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'OPS'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [.755],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [.735],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [.756],
      color: marinersColor
    }, {
      name: "A's",
      data: [.699],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [.726],
      color: angelsColor
    }]
  });

  Highcharts.chart('avg-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Team Avg'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'AVG'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [.262],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [.247],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [.259],
      color: marinersColor
    }, {
      name: "A's",
      data: [.246],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [.260],
      color: angelsColor
    }]
  });

  Highcharts.chart('hr-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Team Hr totals'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'HR'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [215],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [198],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [223],
      color: marinersColor
    }, {
      name: "A's",
      data: [169],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [156],
      color: angelsColor
    }]
  });

  Highcharts.chart('tb-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Team Total Bases'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'TB'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [2394],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [2310],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [2400],
      color: marinersColor
    }, {
      name: "A's",
      data: [2171],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [2197],
      color: angelsColor
    }]
  });

  //Pitching stats
  Highcharts.chart('era-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Team ERA'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'ERA'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [4.37],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [4.06],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [4.00],
      color: marinersColor
    }, {
      name: "A's",
      data: [4.51],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [4.28],
      color: angelsColor
    }]
  });

  Highcharts.chart('qs-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Team Quality Starts'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'QS'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [84],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [77],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [74],
      color: marinersColor
    }, {
      name: "A's",
      data: [69],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [64],
      color: angelsColor
    }]
  });

    Highcharts.chart('baa-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Oponents Batting Average'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'BAA'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [.260],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [.256],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [.253],
      color: marinersColor
    }, {
      name: "A's",
      data: [.263],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [.269],
      color: angelsColor
    }]
  });

      Highcharts.chart('k-chart-container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Team Strikeouts'
    },
    xAxis: {
      categories: [
        'Teams'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'K'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Rangers',
      data: [1154],
      color: rangersColor
    }, {
      name: 'Astros',
      data: [1396],
      color: astrosColor

    }, {
      name: 'Mariners',
      data: [1318],
      color: marinersColor
    }, {
      name: "A's",
      data: [1188],
      color: athleticsColor
    }, {
      name: 'Angels',
      data: [1136],
      color: angelsColor
    }]
  });

  //hide after rendering or chart widths will be incorrect
  $("#pitching-stats-container").css("display", "none");

});