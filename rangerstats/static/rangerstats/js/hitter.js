$(function(){

	$(".hitter-th").click(function(){
		var span = $(this).find("span");
		if($(this).find("span").hasClass("glyphicon-sort"))
			sortTable($(this).data("stat"));
		else {
			var id = parseInt($(this).parent().attr("id"));
				var m = $("#hidden_row-" + id).css("display");
				if($("#hidden-row-" + id).css("display") != "none") {
				for(i = id; i < id + 10; i++){
				$("#hidden-row-" + i).hide();
				}
			} else {
				for(i = id; i < id + 10; i++){
				$("#hidden-row-" + i).slideDown("slow");
				}
			}	
		}
});

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

    var sortOrder = $("#" + field + "-sort-order").val();
    if (sortOrder == 0) {
    sortOnField(data, field, sortOrder);
    	$("#" + field + "-sort-order").val("1");
    } else {
      	sortOnField(data, field, sortOrder);
      	$("#" + field + "-sort-order").val("0");
    }

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

    case "wrc_plus":
      if (sortOrder == "0") {
        data.sort(function(a, b) {
          return b.wrc_plus - a.wrc_plus;
        });
      } else {
        data.sort(function(a, b) {
          return a.wrc_plus - b.wrc_plus;
        });
      }
      break;
  }
}

});


// $(function(){

//   var sortOrder = {
//     date:0,
//     ab:0,
//     h:0,
//     double:0,
//     triple:0,
//     hr:0,
//     rbi:0,
//     k:0,
//     bb:0,
//     avg:0,
//     obp:0,
//     slg:0,
//     wrc_plus:0
//   };

//   $(".hitter-th").click(function(){
//     var span = $(this).find("span");
//     if($(this).find("span").hasClass("glyphicon-sort"))
//       sortTable($(this).data("stat"));
//     else {
//       var id = parseInt($(this).parent().attr("id"));
//         var m = $("#hidden_row-" + id).css("display");
//         if($("#hidden-row-" + id).css("display") != "none") {
//         for(i = id; i < id + 10; i++){
//         $("#hidden-row-" + i).hide();
//         }
//       } else {
//         for(i = id; i < id + 10; i++){
//         $("#hidden-row-" + i).slideDown("2000");
//         }
//       } 
//     }
// });

// function sortTable(field) {
//   var data = []
//   $(".hitter-tr").each(function() {
//     var row = {};
//     row.date = new Date($(this).find(".date")[0].innerText);
//     row.ab = +$(this).find(".ab")[0].innerText;
//     row.h = +$(this).find(".h")[0].innerText;
//     row.double = +$(this).find(".2b")[0].innerText;
//     row.triple = +$(this).find(".3b")[0].innerText;
//     row.hr = +$(this).find(".hr")[0].innerText;
//     row.rbi = +$(this).find(".rbi")[0].innerText;
//     row.k = +$(this).find(".k")[0].innerText;
//     row.bb = +$(this).find(".bb")[0].innerText;
//     row.avg = parseFloat($(this).find(".avg")[0].innerText);
//     row.obp = parseFloat($(this).find(".obp")[0].innerText);
//     row.slg = parseFloat($(this).find(".slg")[0].innerText);
//     row.wrc_plus = $(this).find(".wrc_plus")[0].innerText;
//     data.push(row);
//   });

//     // var sortOrder = $("#" + field + "-sort-order").val();
//     // if (sortOrder == 0) {
//     // sortOnField(data, field, sortOrder);
//     //  $("#" + field + "-sort-order").val("1");
//     // } else {
//     //    sortOnField(data, field, sortOrder);
//     //    $("#" + field + "-sort-order").val("0");
//     // }

//     var fieldSortOrder = sortOrder.field;
//     if (fieldSortOrder == 0) {
//     sortOnField(data, field, fieldSortOrder);
//      //$("#" + field + "-sort-order").val("1");
//      sortOrder.field = 1;
//     } else {
//        sortOnField(data, field, fieldSortOrder);
//        sortOrder.field = 0;
//        //$("#" + field + "-sort-order").val("0");
//     }

//     var index = 0;
//     var rows = $(".hitter-game-log-table tbody .hitter-tr");
//     rows.each(function() {
//       var newRow = data[index];
//       $(this).find(".date")[0].innerText = newRow.date.getFullYear() + "-" + newRow.date.getUTCMonth() + 1 + "-" + newRow.date.getUTCDay()//newRow.date;
//       var month = newRow.date.getUTCMonth() + 1; //months from 1-12
//       var day = newRow.date.getUTCDate();
//       var year = newRow.date.getUTCFullYear();
//       var zeroPad = month < 10 ? "0" : "";
//       $(this).find(".date")[0].innerText = year + "-" + zeroPad + month + "-" + day;
//       $(this).find(".ab")[0].innerText = newRow.ab;
//       $(this).find(".h")[0].innerText = newRow.h;
//       $(this).find(".2b")[0].innerText = newRow.double;
//       $(this).find(".3b")[0].innerText = newRow.triple;
//       $(this).find(".hr")[0].innerText = newRow.hr;
//       $(this).find(".rbi")[0].innerText = newRow.rbi;
//       $(this).find(".k")[0].innerText = newRow.k;
//       $(this).find(".bb")[0].innerText = newRow.bb;
//       $(this).find(".avg")[0].innerText = newRow.avg.toFixed(3);
//       $(this).find(".obp")[0].innerText = newRow.obp.toFixed(3);
//       $(this).find(".slg")[0].innerText = newRow.slg.toFixed(3);
//       $(this).find(".wrc_plus")[0].innerText = newRow.wrc_plus;
//       index++;
//     });
// }

// function sortOnField(data, field, sortOrder) {
//   switch (field) {

//     case "date":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.date - a.date;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.date - b.date;
//         });
//       }
//       break;

//     case "ab":
//       if (sortOrder == 0) {
//         data.sort(function(a, b) {
//           return b.ab - a.ab;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.ab - b.ab;
//         });
//       }
//       break;

//     case "h":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.h - a.h;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.h - b.h;
//         });
//       }
//       break;

//     case "2b":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.double - a.double;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.double - b.double;
//         });
//       }
//       break;

//     case "3b":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.triple - a.triple;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.triple - b.triple;
//         });
//       }
//       break;

//     case "hr":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.hr - a.hr;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.hr - b.hr;
//         });
//       }
//       break;

//     case "rbi":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.rbi - a.rbi;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.rbi - b.rbi;
//         });
//       }
//       break;

//     case "k":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.k - a.k
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.k - b.k;
//         });
//       }
//       break;

//     case "bb":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.bb - a.bb;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.bb - b.bb;
//         });
//       }
//       break;

//     case "avg":
//       if (sortOrder == "0") {
//         var x = "";
//         data.sort(function(a, b) {
//           return b.avg - a.avg;
//         });
//       } else {
//         var x = "";
//         data.sort(function(a, b) {
//           return a.avg - b.avg;
//         });
//       }
//       break;

//     case "obp":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.obp - a.obp;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.obp - b.obp;
//         });
//       }
//       break;

//     case "slg":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.slg - a.slg;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.slg - b.slg;
//         });
//       }
//       break;

//     case "wrc_plus":
//       if (sortOrder == "0") {
//         data.sort(function(a, b) {
//           return b.wrc_plus - a.wrc_plus;
//         });
//       } else {
//         data.sort(function(a, b) {
//           return a.wrc_plus - b.wrc_plus;
//         });
//       }
//       break;
//   }
// }

// });