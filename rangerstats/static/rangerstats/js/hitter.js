$(function() {

  $(".hitter-th").click(function() {
    var span = $(this).find("span");
    if ($(this).find("span").hasClass("glyphicon-sort"))
      sortTable($(this).data("stat"));
    else {
      var id = parseInt($(this).parent().attr("id"));
      var m = $("#hidden_row-" + id).css("display");
      if ($("#hidden-row-" + id).css("display") != "none") {
        for (i = id; i < id + 10; i++) {
          $("#hidden-row-" + i).hide();
        }
      } else {
        for (i = id; i < id + 10; i++) {
          $("#hidden-row-" + i).slideDown("slow");
        }
      }
    }
  });

});

var hitterFieldSortOrders = {
  _date: 0,
  _ab: 0,
  _h: 0,
  _2b: 0,
  _3b: 0,
  _hr: 0,
  _rbi: 0,
  _k: 0,
  _bb: 0,
  _avg: 0,
  _obp: 0,
  _slg: 0,
  _wrc_plus: 0
};

function sortTable(field) {
  var data = []
  $(".hitter-tr").each(function() {
    var row = {};
    row.date = new Date($(this).find(".date")[0].innerText);
    row.ab = +$(this).find(".ab")[0].innerText;
    row.h = +$(this).find(".h")[0].innerText;
    row.double = +$(this).find(".2b")[0].innerText;
    row.triple = +$(this).find(".3b")[0].innerText;
    row.hr = +$(this).find(".hr")[0].innerText;
    row.rbi = +$(this).find(".rbi")[0].innerText;
    row.k = +$(this).find(".k")[0].innerText;
    row.bb = +$(this).find(".bb")[0].innerText;
    row.avg = parseFloat($(this).find(".avg")[0].innerText);
    row.obp = parseFloat($(this).find(".obp")[0].innerText);
    row.slg = parseFloat($(this).find(".slg")[0].innerText);
    row.wrc_plus = $(this).find(".wrc_plus")[0].innerText;
    data.push(row);
  });

  var sortOrder = hitterFieldSortOrders["_" + field];
  sortOnField(data, field, sortOrder);
  hitterFieldSortOrders["_" + field] = (sortOrder == 0 ? 1 : 0);

  var index = 0;
  var rows = $(".game-log-table tbody .hitter-tr");
  rows.each(function() {
    var newRow = data[index];
    var month = "0" + (newRow.date.getUTCMonth() + 1);
    var day = "0" + newRow.date.getUTCDate()
    var year = newRow.date.getUTCFullYear();
    $(this).find(".date")[0].innerText = year + "-" + month.slice(-2) + "-" + day.slice(-2);
    $(this).find(".ab")[0].innerText = newRow.ab;
    $(this).find(".h")[0].innerText = newRow.h;
    $(this).find(".2b")[0].innerText = newRow.double;
    $(this).find(".3b")[0].innerText = newRow.triple;
    $(this).find(".hr")[0].innerText = newRow.hr;
    $(this).find(".rbi")[0].innerText = newRow.rbi;
    $(this).find(".k")[0].innerText = newRow.k;
    $(this).find(".bb")[0].innerText = newRow.bb;
    $(this).find(".avg")[0].innerText = newRow.avg.toFixed(3);
    $(this).find(".obp")[0].innerText = newRow.obp.toFixed(3);
    $(this).find(".slg")[0].innerText = newRow.slg.toFixed(3);
    $(this).find(".wrc_plus")[0].innerText = newRow.wrc_plus;
    index++;
  });

  $(".sorted-on").each(function() {
    $(this).removeClass("sorted-on");
  });

  $("tr td." + field).each(function() {
    $(this).addClass("sorted-on");
  });
}

function sortOnField(data, field, sortOrder) {
  if (sortOrder == 0) {
    data.sort(function(a, b) {
      var v = a[field];
      return b[field] - a[field];
    });
  } else {
    data.sort(function(a, b) {
      return a[field] - b[field];
    });
  }
}