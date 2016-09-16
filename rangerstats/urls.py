from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name = 'index'),
	url(r'hitter/(?P<player_id>[0-9]+)', views.hitter, name='hitter'),
	url(r'pitcher/(?P<player_id>[0-9]+)', views.pitcher, name='pitcher'),
	url(r'individual-stats/', views.individual_stats, name='individual_stats'),
	url(r'teamstats/', views.teamstats, name='teamstats')
]