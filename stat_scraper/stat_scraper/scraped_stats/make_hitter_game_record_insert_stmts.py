
import os, json

# hitters = ["Adrian_Beltre", "Robinson_Chirinos", "Jonathan_Lucroy", "Brett_Nicholas",
# "Hanser_Alberto", "Elvis_Andrus", "Joey_Gallo", "Mitch_Moreland", "Rougned_Odor", "Jurickson_Profar",
# "Delino_DeShields", "Ian_Desmond", "Carlos_Gomez", "Jared_Hoying", "Nomar_Mazara", "Ryan_Rua",
# "Carlos_Beltran"]

hitters = ["Robinson_Chirinos"]

tracked_stats = ["PA", "AB",  "AVG", "H", "1B", "2B", "3B", "HR", "RBI", "BB",
 "SO", "HBP", "SF", "SLG", "OBP", "wRC+"]

tracked_stats_formatted = {"PA":"pa", "AB":"ab",  "AVG":"avg", "H":"h", "1B":"single", 
"2B":"double" , "3B":"triple", "HR":"hr", "RBI":"rbi", "BB":"bb", "SO":"k", "HBP":"hbp",
 "SF":"sf", "SLG":"slg", "OBP":"obp", "wRC+":"wrc_plus"}

base_insert_stmt = "INSERT INTO rangerstats_hitter_game_record (game_date, pa, ab, avg, h, single, double, triple, hr, rbi, bb, k, hbp, sf, slg, obp, wrc_plus, player_id) VALUES "
cwd = os.getcwd()
for hitter_name in hitters:
	split_name = hitter_name.split("_")
	insert_stmt_file = open("insert_stmts/" + hitter_name + "_game_record_insert_stmts.txt", "w")
	with open(cwd + "/" + hitter_name + "_FG.json") as game_record_json:
		json_text = json.load(game_record_json)
		#print json_text
		for name in json_text:
			print name
			for date in json_text[name]:
				print date
				#prod
				insert_stmt = base_insert_stmt + "(to_date('" + date + "', 'YYYY-MM-DD'), "
				#dev
				#insert_stmt = base_insert_stmt + "('" + date + " 00:00:00', "
				game_record = json_text[name][date]
				with open(cwd + "/" + hitter_name + "_FG_Alt.json") as game_record_alt_json:
					alt_json_text = json.load(game_record_alt_json)
					#print alt_json_text
					game_record_alt = alt_json_text[name][date]
					for tracked_stat in tracked_stats:
						if tracked_stat in game_record:
							insert_stmt = insert_stmt + game_record[tracked_stat] + ", "
						else:
							insert_stmt = insert_stmt + game_record_alt[tracked_stat] + ", "


					insert_stmt = insert_stmt + " (select id from rangerstats_player where first_name = '" + split_name[0] + "' and last_name = '"+ split_name[1] + "'));"
					print insert_stmt
					insert_stmt_file.write(insert_stmt + "\n")