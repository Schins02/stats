from django.shortcuts import render
from django.template import loader
from . import models
import json
from django.core import serializers

def index(request):
	return render(request, 'rangerstats/index.html')

def individual_stats(request):
	players = models.Player.objects.all().order_by('last_name')
	
	num_rows = len(players) / 4
	if len(players) % 4 != 0:
		num_rows += 1
	player_rows = [[] for i in range(num_rows)]
	player_index = 0
	row_index = 0
	row = player_rows[0]
	for player in players:
		if player_index % 4 == 0 and row_index != 0:
			row_index += 1
			row = player_rows[row_index]
		row.append(player)
		player_index += 1

	context = {'player_rows' : player_rows}
	return render(request, 'rangerstats/individual-stats.html', context)

def hitter(request, player_id):
	player = models.Player.objects.get(pk=player_id)
	game_log = models.Hitter_Game_Record.objects.filter(player=player).order_by('-game_date')
	game_log_json = serializers.serialize("json", models.Hitter_Game_Record.objects.filter(player=player))
	context = {'player': player, 'game_log': game_log, 'game_log_json': game_log_json }
	return render(request, 'rangerstats/hitter.html', context)

def pitcher(request, player_id):
	player = models.Player.objects.get(pk=player_id)
	game_log = models.Pitcher_Game_Record.objects.filter(player=player).order_by('-game_date')
	game_log_json = serializers.serialize("json", models.Pitcher_Game_Record.objects.filter(player=player))
	context = {'player': player, 'game_log': game_log, 'game_log_json': game_log_json }
	return render(request, 'rangerstats/pitcher.html', context)

def teamstats(request):
	hitter_stats_dict = {}
	hitters = models.Player.objects.all().exclude(position='P')
	for hitter in hitters:		
		hitter_stats = models.Hitter_Season_Stats.objects.get(player=hitter)
		print(hitter_stats.g)
		hitter_stats_dict[hitter] = hitter_stats

	pitcher_stats_dict = {}
	pitchers = models.Player.objects.filter(position='P')
	for pitcher in pitchers:
		pitcher_stats = models.Pitcher_Season_Stats.objects.get(player=pitcher)
		print(pitcher_stats.g)
		pitcher_stats_dict[pitcher] = pitcher_stats

	context = {'hitter_stats_dict' : hitter_stats_dict,
				'pitcher_stats_dict' : pitcher_stats_dict }

	return render(request, 'rangerstats/teamstats.html', context)
