# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-01 11:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rangerstats', '0002_auto_20160830_2026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hitter_game_record',
            name='game_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='pitcher_game_record',
            name='game_date',
            field=models.DateTimeField(),
        ),
    ]