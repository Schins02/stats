from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name = 'index'),
	# url(r'player/(?P<player_id>[0-9]+)', views.player, name='player'),
	# url(r'teamstats/', views.teamstats, name='teamstats')
]