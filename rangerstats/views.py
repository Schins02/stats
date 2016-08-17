from django.shortcuts import render
from django.template import loader
from . import models

def index(request):
	return render(request, 'rangerstats/index.html')

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
