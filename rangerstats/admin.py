from django.contrib import admin
from .models import Player, Hitter_Season_Stats, Hitter_Game_Record, Pitcher_Season_Stats, Pitcher_Game_Record

admin.site.register(Player)
admin.site.register(Hitter_Season_Stats)
admin.site.register(Hitter_Game_Record)
admin.site.register(Pitcher_Season_Stats)
admin.site.register(Pitcher_Game_Record)
