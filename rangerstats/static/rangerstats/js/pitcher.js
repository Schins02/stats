$(function() {

  $(".pitcher-th").click(function() {
    sortTable($(this).data("stat"));
  });

});

var pitcherFieldSortOrders = {
  date: 0,
  w: 0,
  l: 0,
  ip: 0,
  bf: 0,
  er: 0,
  r: 0,
  h: 0,
  bb: 0,
  k: 0,
  hr: 0,
};

function sortTable(field) {
  var data = []
  $(".pitcher-tr").each(function() {
    var row = {};
    row.date = new Date($(this).find(".date")[0].innerText);
    row.w = +$(this).find(".w")[0].innerText;
    row.l = +$(this).find(".l")[0].innerText;
    row.ip = +$(this).find(".ip")[0].innerText;
    row.bf = +$(this).find(".bf")[0].innerText;
    row.er = +$(this).find(".er")[0].innerText;
    row.r = +$(this).find(".r")[0].innerText;
    row.h = +$(this).find(".h")[0].innerText;
    row.bb = +$(this).find(".bb")[0].innerText;
    row.k = +$(this).find(".k")[0].innerText;
    row.hr = +$(this).find(".hr")[0].innerText;
    data.push(row);
  });

  var sortOrder = pitcherFieldSortOrders[field];
  sortOnField(data, field, sortOrder);
  pitcherFieldSortOrders[field] = (sortOrder == 0 ? 1 : 0);

  var index = 0;
  var rows = $(".game-log-table tbody .pitcher-tr");
  rows.each(function() {
    var newRow = data[index];
    var month = "0" + (newRow.date.getUTCMonth() + 1);
    var day = "0" + newRow.date.getUTCDate()
    var year = newRow.date.getUTCFullYear();
    $(this).find(".date")[0].innerText = year + "-" + month.slice(-2) + "-" + day.slice(-2);
    $(this).find(".w")[0].innerText = newRow.w;
    $(this).find(".l")[0].innerText = newRow.l;
    $(this).find(".ip")[0].innerText = newRow.ip.toFixed(1);
    $(this).find(".bf")[0].innerText = newRow.bf;
    $(this).find(".er")[0].innerText = newRow.er;
    $(this).find(".r")[0].innerText = newRow.r;
    $(this).find(".h")[0].innerText = newRow.h;
    $(this).find(".bb")[0].innerText = newRow.bb;
    $(this).find(".k")[0].innerText = newRow.k;
    $(this).find(".hr")[0].innerText = newRow.hr;
    index++;
  });

  $(".sorted-on").each(function() {
    $(this).removeClass("sorted-on");
  })

  $("tr td." + field).each(function() {
    $(this).addClass("sorted-on");
  })
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