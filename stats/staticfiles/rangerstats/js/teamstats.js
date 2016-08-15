$(function() {
  var bsSwitch = $("#table-switch");
  $(bsSwitch).bootstrapSwitch();
  $(bsSwitch).bootstrapSwitch("onColor", "red");
  $(bsSwitch).bootstrapSwitch("offColor", "blue");
  $(bsSwitch).on("switchChange.bootstrapSwitch", function(event, state) {
    if (state) {
      $(".hitter-table").css("display", "");
      //console.log("if evenrt" + event);
      $(".pitcher-table").css("display", "none");
    } else {
      $(".hitter-table").css("display", "none");
      // $(".pitcher-table").css("display", "block");
      $(".pitcher-table").show();
    }
  });

  $(".sort-hitter").click(function() {
    console.log("CLicked");
    var field = $(this).parent()[0].innerText.toLowerCase();
    var data = []
    $(".hitter-tr").each(function() {
      var row = {};
      //row.className = this.className;
      row.name = $(this).find(".name")[0].innerText;
      row.g = +$(this).find(".g")[0].innerText;
      row.ab = +$(this).find(".ab")[0].innerText;
      row.h = +$(this).find(".h")[0].innerText;
      row.single = +$(this).find(".1b")[0].innerText;
      row.double = +$(this).find(".2b")[0].innerText;
      row.triple = +$(this).find(".3b")[0].innerText;
      row.hr = +$(this).find(".hr")[0].innerText;
      row.rbi = +$(this).find(".rbi")[0].innerText;
      row.k = +$(this).find(".k")[0].innerText;
      row.bb = +$(this).find(".bb")[0].innerText;
      row.avg = parseFloat($(this).find(".avg")[0].innerText);
      row.obp = parseFloat($(this).find(".obp")[0].innerText);
      row.slg = parseFloat($(this).find(".slg")[0].innerText);
      row.ops = parseFloat($(this).find(".ops")[0].innerText);
      row.war = parseFloat($(this).find(".war")[0].innerText);
      data.push(row);
    });


    var sortOrder = $("#" + field + "-sort-order").val();
    if (sortOrder == 0) {

      sortOnField(data, field, sortOrder);
      $("#" + field + "-sort-order").val("1");
    } else {

      sortOnField(data, field, sortOrder);
      $("#" + field + "-sort-order").val("0");
    }

    var index = 0;

    var tbody = $(".hitter-table tbody");
    var rows = tbody.children();
    rows.each(function() {
      var newRow = data[index];
      $(this).find(".name")[0].innerText = newRow.name;
      $(this).find(".g")[0].innerText = newRow.g;
      $(this).find(".ab")[0].innerText = newRow.ab;
      $(this).find(".h")[0].innerText = newRow.h;
      $(this).find(".1b")[0].innerText = newRow.single;
      $(this).find(".2b")[0].innerText = newRow.double;
      $(this).find(".3b")[0].innerText = newRow.triple;
      $(this).find(".hr")[0].innerText = newRow.hr;
      $(this).find(".rbi")[0].innerText = newRow.rbi;
      $(this).find(".k")[0].innerText = newRow.k;
      $(this).find(".bb")[0].innerText = newRow.bb;
      $(this).find(".avg")[0].innerText = newRow.avg.toFixed(3);
      $(this).find(".obp")[0].innerText = newRow.obp.toFixed(3);
      $(this).find(".slg")[0].innerText = newRow.slg.toFixed(3);
      $(this).find(".ops")[0].innerText = newRow.ops.toFixed(3);
      $(this).find(".war")[0].innerText = newRow.war.toFixed(2);
      index++;
    });
  });

  $(".sort-pitcher").click(function() {
    var field = $(this).parent()[0].innerText.toLowerCase().replace(/\//g, ""); 
    var data = []
    $(".pitcher-tr").each(function() {
      var row = {};
      row.name = $(this).find(".name")[0].innerText;
      row.g = +$(this).find(".g")[0].innerText;
      row.w = +$(this).find(".w")[0].innerText;
      row.l = +$(this).find(".l")[0].innerText;
      row.sv = +$(this).find(".sv")[0].innerText;
      row.ip = parseFloat($(this).find(".ip")[0].innerText);
      row.whip = parseFloat($(this).find(".whip")[0].innerText);
      row.kPerNine = parseFloat($(this).find(".k9")[0].innerText);
      row.k = +$(this).find(".k")[0].innerText;
      row.bbPerNine = parseFloat($(this).find(".bb9")[0].innerText);
      row.hrPerNine = parseFloat($(this).find(".hr9")[0].innerText);
      row.babip = parseFloat($(this).find(".babip")[0].innerText);
      row.era = parseFloat($(this).find(".era")[0].innerText);
      row.fip = parseFloat($(this).find(".fip")[0].innerText);
      row.xfip = parseFloat($(this).find(".xfip")[0].innerText);
      row.war = parseFloat($(this).find(".war")[0].innerText);
      data.push(row);
    });


    var sortOrder = $("#p-" + field + "-sort-order").val();
    if (sortOrder == 0) {

      sortOnFieldPitcher(data, field, sortOrder);
      $("#p-" + field + "-sort-order").val("1");
    } else {

      sortOnFieldPitcher(data, field, sortOrder);
      $("#p-" + field + "-sort-order").val("0");
    }

    var index = 0;

    var tbody = $(".pitcher-table tbody");
    var rows = tbody.children();
    rows.each(function() {
      var newRow = data[index];
      $(this).find(".name")[0].innerText = newRow.name;
      $(this).find(".g")[0].innerText = newRow.g;
      $(this).find(".w")[0].innerText = newRow.w;
      $(this).find(".l")[0].innerText = newRow.l;
      $(this).find(".sv")[0].innerText = newRow.sv;
      $(this).find(".ip")[0].innerText = newRow.ip.toFixed(1);
      $(this).find(".whip")[0].innerText = newRow.whip.toFixed(2);
      $(this).find(".k9")[0].innerText = newRow.kPerNine.toFixed(2);
      $(this).find(".k")[0].innerText = newRow.k;
      $(this).find(".bb9")[0].innerText = newRow.bbPerNine.toFixed(2);
      $(this).find(".hr9")[0].innerText = newRow.hrPerNine.toFixed(2);
      $(this).find(".babip")[0].innerText = newRow.babip.toFixed(3);
      $(this).find(".era")[0].innerText = newRow.era.toFixed(2);
      $(this).find(".fip")[0].innerText = newRow.fip.toFixed(2);
      $(this).find(".xfip")[0].innerText = newRow.xfip.toFixed(2);
      $(this).find(".war")[0].innerText = newRow.war.toFixed(2);
      index++;
    });
  });
});

function sortOnField(data, field, sortOrder) {
  switch (field) {
    case "g":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.g - a.g;
        });
      } else {
        data.sort(function(a, b) {
          return a.g - b.g;
        });
      }
      break;

    case "ab":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.ab - a.ab;
        });
      } else {
        data.sort(function(a, b) {
          return a.ab - b.ab;
        });
      }
      break;

    case "h":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.h - a.h;
        });
      } else {
        data.sort(function(a, b) {
          return a.h - b.h;
        });
      }
      break;

    case "1b":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.single - a.single;
        });
      } else {
        data.sort(function(a, b) {
          return a.single - b.single;
        });
      }
      break;

    case "2b":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.double - a.double;
        });
      } else {
        data.sort(function(a, b) {
          return a.double - b.double;
        });
      }
      break;

    case "3b":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.triple - a.triple;
        });
      } else {
        data.sort(function(a, b) {
          return a.triple - b.triple;
        });
      }
      break;

    case "hr":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.hr - a.hr;
        });
      } else {
        data.sort(function(a, b) {
          return a.hr - b.hr;
        });
      }
      break;

    case "rbi":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.rbi - a.rbi;
        });
      } else {
        data.sort(function(a, b) {
          return a.rbi - b.rbi;
        });
      }
      break;

    case "k":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.k - a.k
        });
      } else {
        data.sort(function(a, b) {
          return a.k - b.k;
        });
      }
      break;

    case "bb":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.bb - a.bb;
        });
      } else {
        data.sort(function(a, b) {
          return a.bb - b.bb;
        });
      }
      break;

    case "avg":
      if (sortOrder == "0") {
        var x = "";
        data.sort(function(a, b) {
          return b.avg - a.avg;
        });
      } else {
        var x = "";
        data.sort(function(a, b) {
          return a.avg - b.avg;
        });
      }
      break;

    case "obp":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.obp - a.obp;
        });
      } else {
        data.sort(function(a, b) {
          return a.obp - b.obp;
        });
      }
      break;

    case "slg":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.slg - a.slg;
        });
      } else {
        data.sort(function(a, b) {
          return a.slg - b.slg;
        });
      }
      break;

    case "ops":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.ops - a.ops;
        });
      } else {
        data.sort(function(a, b) {
          return a.ops - b.ops;
        });
      }
      break;

    case "war":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.war - a.war;
        });
      } else {
        data.sort(function(a, b) {
          return a.war - b.war;
        });
      }
      break;
  }
}

function sortOnFieldPitcher(data, field, sortOrder) {
  switch (field) {
    case "g":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.g - a.g;
        });
      } else {
        data.sort(function(a, b) {
          return a.g - b.g;
        });
      }
      break;

    case "w":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.w - a.w;
        });
      } else {
        data.sort(function(a, b) {
          return a.w - b.w;
        });
      }
      break;

    case "l":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.l - a.l;
        });
      } else {
        data.sort(function(a, b) {
          return a.l - b.l;
        });
      }
      break;

    case "sv":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.sv - a.sv;
        });
      } else {
        data.sort(function(a, b) {
          return a.sv - b.sv;
        });
      }
      break;

    case "ip":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.ip - a.ip;
        });
      } else {
        data.sort(function(a, b) {
          return a.ip - b.ip;
        });
      }
      break;

    case "whip":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.whip - a.whip;
        });
      } else {
        data.sort(function(a, b) {
          return a.whip - b.whip;
        });
      }
      break;

    case "k9":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.kPerNine - a.kPerNine;
        });
      } else {
        data.sort(function(a, b) {
          return a.kPerNine - b.kPerNine;
        });
      }
      break;

    case "k":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.k - a.k;
        });
      } else {
        data.sort(function(a, b) {
          return a.k - b.k;
        });
      }
      break;

    case "bb9":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.bbPerNine - a.bbPerNine;
        });
      } else {
        data.sort(function(a, b) {
          return a.bbPerNine - b.bbPerNine;
        });
      }
      break;

    case "hr9":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.hrPerNine - a.hrPerNine
        });
      } else {
        data.sort(function(a, b) {
          return a.hrPerNine - b.hrPerNine;
        });
      }
      break;

    case "babip":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.babip - a.babip;
        });
      } else {
        data.sort(function(a, b) {
          return a.babip - b.babip;
        });
      }
      break;

    case "era":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.era - a.era;
        });
      } else {
        data.sort(function(a, b) {
          return a.era - b.era;
        });
      }
      break;

    case "fip":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.fip - a.fip;
        });
      } else {
        data.sort(function(a, b) {
          return a.fip - b.fip;
        });
      }
      break;

    case "xfip":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.xfip - a.xfip;
        });
      } else {
        data.sort(function(a, b) {
          return a.xfip - b.xfip;
        });
      }
      break;


    case "war":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.war - a.war;
        });
      } else {
        data.sort(function(a, b) {
          return a.war - b.war;
        });
      }
      break;
  }
}
