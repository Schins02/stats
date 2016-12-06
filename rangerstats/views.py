from django.shortcuts import render
from django.template import loader
from . import models
import json
from django.core import serializers

def index(request):
	return render(request, 'rangerstats/index.html')

def hitter(request, player_id):
	player = models.Player.objects.get(pk=player_id)
	game_log = models.Hitter_Game_Record.objects.filter(player=player).order_by('-game_date')
	game_log_json = serializers.serialize("json", models.Hitter_Game_Record.objects.filter(player=player))
	season_stats_json = serializers.serialize("json", models.Hitter_Season_Stats.objects.filter(player=player))
	context = {'player': player, 'game_log': game_log, 'game_log_json': game_log_json, 'season_stats_json': season_stats_json }
	return render(request, 'rangerstats/hitter.html', context)

def pitcher(request, player_id):
	player = models.Player.objects.get(pk=player_id)
	game_log = models.Pitcher_Game_Record.objects.filter(player=player).order_by('-game_date')
	game_log_json = serializers.serialize("json", models.Pitcher_Game_Record.objects.filter(player=player))
	season_stats_json = serializers.serialize("json", models.Pitcher_Season_Stats.objects.filter(player=player))
	context = {'player': player, 'game_log': game_log, 'game_log_json': game_log_json, 'season_stats_json': season_stats_json }
	return render(request, 'rangerstats/pitcher.html', context)

def season_stats(request):
	hitter_stats_dict = {}
	hitters = models.Player.objects.all().exclude(position='P')
	for hitter in hitters:		
		hitter_stats = models.Hitter_Season_Stats.objects.get(player=hitter)
		hitter_stats_dict[hitter] = hitter_stats

	pitcher_stats_dict = {}
	pitchers = models.Player.objects.filter(position='P')
	for pitcher in pitchers:
		pitcher_stats = models.Pitcher_Season_Stats.objects.get(player=pitcher)
		pitcher_stats_dict[pitcher] = pitcher_stats

	context = {'hitter_stats_dict' : hitter_stats_dict,
				'pitcher_stats_dict' : pitcher_stats_dict }

	return render(request, 'rangerstats/season-stats.html', context)

def roster(request):
	players = models.Player.objects.all().order_by('last_name').values()
	context = {'players' : players }
	return render(request, 'rangerstats/roster.html', context)

def team_stats(request):
	return render(request, 'rangerstats/team-stats.html')

def about(request):
	return render(request, 'rangerstats/about.html')
	
