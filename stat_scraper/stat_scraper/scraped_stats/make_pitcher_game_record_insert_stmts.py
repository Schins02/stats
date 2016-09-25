import os, json

pitchers = ["Dario_Alvarez", "Tony_Barnette", "Matt_Bush", "Alex_Claudio", "Yu_Darvish", 
"Jake_Diekman", "Sam_Dyson", "A.J._Griffin","Cole_Hamels", "Derek_Holland", "Keone_Kela",
"Jose_Leclerc", "Colby_Lewis", "Nick_Martinez", "Yohander_Mendez", "Martin_Perez", "Tanner_Scheppers"]

tracked_stats = ["W", "L",  "IP", "TBF", "ER", "R", "H", "BB", "SO", "HR"]

tracked_stats_formatted = {"W":"w", "L":"l",  "IP":"ip", "TBF":"bf", "R":"r", "ER":"er", 
"H":"h" , "BB":"bb", "SO":"k", "HBP":"hbp"}

base_insert_stmt = "INSERT INTO rangerstats_pitcher_game_record (game_date, w, l, ip, bf, r, er, h, bb, k, hr, player_id) VALUES "

cwd = os.getcwd()
for pitcher_name in pitchers:
	split_name = pitcher_name.split('_')
	insert_stmt_file = open("insert_stmts/" + pitcher_name + "_game_record_insert_stmts.txt", "w")
	with open(cwd + "/" + pitcher_name + "_FG.json") as game_record_json:
		json_text = json.load(game_record_json)
		for name in json_text:
			for date in json_text[name]:
				#prod
				insert_stmt = base_insert_stmt + "(to_date('" + date + "', 'YYYY-MM-DD'), "
				#dev
				#insert_stmt = base_insert_stmt + "('" + date + " 00:00:00', "
				game_record = json_text[name][date]
				with open(cwd + "/" + pitcher_name + "_FG_Alt.json") as game_record_alt_json:
					alt_json_text = json.load(game_record_alt_json)
					game_record_alt = alt_json_text[name][date]
					for tracked_stat in tracked_stats:
						if tracked_stat in game_record:
							insert_stmt = insert_stmt + game_record[tracked_stat] + ", "
						else:
							insert_stmt = insert_stmt + game_record_alt[tracked_stat] + ", "


					insert_stmt = insert_stmt + " (select id from rangerstats_player where first_name = '" + split_name[0] + "' and last_name = '"+ split_name[1] + "'));"
					print insert_stmt
					insert_stmt_file.write(insert_stmt + "\n")


