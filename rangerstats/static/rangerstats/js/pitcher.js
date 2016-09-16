$(function(){

	$(".pitcher-th").click(function(){
    sortTable($(this).data("stat"));
});

//change this to .click func
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
    //era fir xfip below
		// row.avg = parseFloat($(this).find(".avg")[0].innerText);
		// row.obp = parseFloat($(this).find(".obp")[0].innerText);
		// row.slg = parseFloat($(this).find(".slg")[0].innerText);
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
    var rows = $(".game-log-table tbody .pitcher-tr");
    rows.each(function() {
      var newRow = data[index];
      var month = "0" + (newRow.date.getUTCMonth() + 1); //months from 1-12
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
}

function sortOnField(data, field, sortOrder) {
  switch (field) {

    case "date":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.date - a.date;
        });
      } else {
        data.sort(function(a, b) {
          return a.date - b.date;
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

    case "ip  ":
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

    case "bf":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.bf - a.bf;
        });
      } else {
        data.sort(function(a, b) {
          return a.bf - b.bf;
        });
      }
      break;

    case "er":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.er - a.er;
        });
      } else {
        data.sort(function(a, b) {
          return a.er - b.er;
        });
      }
      break;

    case "r":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.r - a.r;
        });
      } else {
        data.sort(function(a, b) {
          return a.r - b.r;
        });
      }
      break;

    case "h":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.h - a.h
        });
      } else {
        data.sort(function(a, b) {
          return a.h - b.h;
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

    case "k":
      if (sortOrder == "0") {
        var x = "";
        data.sort(function(a, b) {
          return b.k - a.k;
        });
      } else {
        var x = "";
        data.sort(function(a, b) {
          return a.k - b.k;
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
  }
}

});