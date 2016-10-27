$(function() {
  $("#season-stats").addClass("active");

  var bsSwitch = $("#table-switch");
  $(bsSwitch).bootstrapSwitch();
  $(bsSwitch).bootstrapSwitch("onColor", "red");
  $(bsSwitch).bootstrapSwitch("offColor", "blue");
  $(bsSwitch).on("switchChange.bootstrapSwitch", function(event, state) {
    if (state) {
      $(".hitter-table").css("display", "");
      $(".pitcher-table").css("display", "none");
    } else {
      $(".hitter-table").css("display", "none");
      $(".pitcher-table").show();
    }
  });

  var hitterFieldMap = {
    _g: "g",
    _ab: "ab",
    _h: "h",
    _1b: "single",
    _2b: "double",
    _3b: "triple",
    _hr: "hr",
    _rbi: "rbi",
    _k: "k",
    _bb: "bb",
    _avg: "avg",
    _obp: "obp",
    _slg: "slg",
    _ops: "ops",
    _war: "war"
  };

  var hitterFieldSortOrders = {
    _g: 0,
    _ab: 0,
    _h: 0,
    _1b: 0,
    _2b: 0,
    _3b: 0,
    _hr: 0,
    _rbi: 0,
    _k: 0,
    _bb: 0,
    _avg: 0,
    _obp: 0,
    _slg: 0,
    _ops: 0,
    _war: 0
  };

  $(".sort-hitter").click(function() {
    var displayedField = $(this).parent()[0].innerText.toLowerCase();
    var field = hitterFieldMap["_" + displayedField]; 
    var sortOrder = hitterFieldSortOrders["_" + displayedField];
    var data = []
    $(".hitter-tr").each(function() {
      var row = {};
      row.name = $(this).find(".name")[0].innerText;
      row.link = $($(this).find(".link")[0]).attr("href");
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

    sortOnField(data, field, sortOrder);
    hitterFieldSortOrders["_" + displayedField] = (sortOrder == 0 ? 1 : 0);

    var index = 0;
    var tbody = $(".hitter-table tbody");
    var rows = tbody.children();
    rows.each(function() {
      var newRow = data[index];
      $(this).find(".link")[0].innerText = newRow.name;
      $($(this).find(".link")[0]).attr("href", newRow.link);
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

    $(".hitter.sorted-on").each(function(){
      $(this).removeClass("sorted-on");
    });

    $(".hitter." + field).each(function(){
      $(this).addClass("sorted-on");
    });
  });

  var pitcherFieldMap = {
    g: "g",
    w: "w",
    l: "l",
    sv: "sv",
    ip: "ip",
    k9: "kPerNine",
    k: "k",
    bb9: "bbPerNine",
    hr9: "hrPerNine",
    babip: "babip",
    era: "era",
    fip: "fip",
    xfip: "xfip",
    war: "war"
  };

  var pitcherFieldSortOrders = {
    g:0,
    w:0,
    l:0,
    sv:0,
    ip:0,
    k9:0,
    k:0,
    bb9:0,
    hr9:0,
    babip:0,
    era:0,
    fip:0,
    xfip:0,
    war:0
  };

  $(".sort-pitcher").click(function() {
    var displayedField = $(this).parent()[0].innerText.replace(/\//g, "").toLowerCase();
    var field = pitcherFieldMap[displayedField]; 
    var sortOrder = pitcherFieldSortOrders[displayedField];
    var data = []
    $(".pitcher-tr").each(function() {
      var row = {};
      row.name = $(this).find(".name")[0].innerText;
      row.link = $($(this).find(".link")[0]).attr("href");
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

    sortOnField(data, field, sortOrder);
    pitcherFieldSortOrders[displayedField] = (sortOrder == 0 ? 1 : 0);

    var index = 0;
    var tbody = $(".pitcher-table tbody");
    var rows = tbody.children();
    rows.each(function() {
      var newRow = data[index];
      $(this).find(".link")[0].innerText = newRow.name;
      $($(this).find(".link")[0]).attr("href", newRow.link);
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

    $(".pitcher.sorted-on").each(function(){
      $(this).removeClass("sorted-on");
    });

    $(".pitcher." + displayedField).each(function(){
      $(this).addClass("sorted-on");
    });

  });

});

function sortOnField(data, field, sortOrder) {
  if(sortOrder == 0){
    data.sort(function(a, b) {
      var v = a[field];
      return b[field] - a[field];
    });
  } else {
      data.sort(function(a, b){
        return a[field] - b[field];
      });
  }
}
