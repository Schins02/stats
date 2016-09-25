from __future__ import unicode_literals
from django.db import models
from datetime import date

class Player(models.Model):
	first_name = models.CharField(max_length = 30)
	last_name = models.CharField(max_length = 30)
	position = models.CharField(max_length = 15)
	bat = models.CharField(max_length = 10)
	throw = models.CharField(max_length = 15)
	height = models.CharField(max_length = 10)
	weight = models.IntegerField()
	age = models.IntegerField()
	team = models.CharField(max_length = 40)

	def __str__(self):
		return self.first_name + " " + self.last_name

class Hitter_Season_Stats(models.Model):
	player = models.ForeignKey(Player)
	g = models.IntegerField()
	pa = models.IntegerField()
	ab = models.IntegerField()
	avg = models.FloatField()
	h = models.IntegerField()
	single = models.IntegerField()
	double = models.IntegerField()
	triple = models.IntegerField()
	hr = models.IntegerField()
	rbi = models.IntegerField()
	bb = models.IntegerField()
	k = models.IntegerField()
	hbp = models.IntegerField()
	sf = models.IntegerField()
	slg = models.FloatField()
	obp = models.FloatField()
	ops = models.FloatField()
	war = models.FloatField()

class Hitter_Game_Record(models.Model):
	player = models.ForeignKey(Player)
	game_date = models.DateTimeField() 
	pa = models.IntegerField()
	ab = models.IntegerField()
	avg = models.FloatField()
	h = models.IntegerField()
	single = models.IntegerField()
	double = models.IntegerField()
	triple = models.IntegerField()
	hr = models.IntegerField()
	rbi = models.IntegerField()
	bb = models.IntegerField()
	k = models.IntegerField()
	hbp = models.IntegerField()
	sf = models.IntegerField()
	slg = models.FloatField()
	obp = models.FloatField()
	wrc_plus = models.IntegerField()

class Pitcher_Season_Stats(models.Model):
	player = models.ForeignKey(Player)
	g = models.IntegerField()
	w = models.IntegerField()
	l = models.IntegerField()
	sv = models.IntegerField()
	ip = models.FloatField()
	whip = models.FloatField()
	k_per_nine = models.FloatField()
	k = models.IntegerField()
	bb_per_nine = models.FloatField()
	hr_per_nine = models.FloatField()
	babip = models.FloatField()
	era = models.FloatField()
	fip = models.FloatField()
	x_fip = models.FloatField()
	war = models.FloatField()


class Pitcher_Game_Record(models.Model):
	player = models.ForeignKey(Player)
	game_date = models.DateTimeField() 
	w = models.IntegerField()
	l = models.IntegerField()
	ip = models.FloatField()
	bf = models.IntegerField()
	er = models.IntegerField()
	r = models.IntegerField()
	h = models.IntegerField()
	bb = models.IntegerField()
	k = models.IntegerField()
	hr = models.IntegerField()

