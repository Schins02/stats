"""stats URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rangerstats import views

urlpatterns = [
	#url(r'^rangerstats/', include('rangerstats.urls')),
	url(r'^$', views.index, name = 'index'),
	url(r'hitter/(?P<player_id>[0-9]+)', views.hitter, name='hitter'),
	url(r'pitcher/(?P<player_id>[0-9]+)', views.pitcher, name='pitcher'),
	url(r'roster/', views.roster, name='roster'),
	url(r'season-stats/', views.season_stats, name='season_stats'),
    url(r'team-stats/', views.team_stats, name='team_stats'),
	url(r'about/', views.about, name='about'),
    url(r'^admin/', admin.site.urls),
]
