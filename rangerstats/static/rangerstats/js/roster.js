$(function(){
	$("#roster").addClass("active");

	$(".indiv-stats-player-card").click(function() {
		var route = $(this).data("position") == "P" ? "pitcher" : "hitter";
		window.location.href = "/" + route + "/" + $(this).attr("id");
	});
});