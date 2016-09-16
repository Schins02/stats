import scrapy, json
from scrapy.selector import Selector

class GameRecordSpider(scrapy.Spider):
	name = "fg_game_record"
	allowed_domains = ["fangraphs.com"]
	start_urls = ["http://www.fangraphs.com/statsd.aspx?playerid=589&position=OF"]

	def parse(self, response):
		name = response.xpath("//div[@id='content']/table//tr/td[1]/table/tr[1]/td/span/strong/text()")[0].extract()
		game_log_json = {}
		game_log_json[name] = {}
		game_record_table = response.xpath("//table[@id='DailyStats1_dgSeason1_ctl00']/tbody")

		stat_types = game_record_table.xpath("tr[@id='DailyStats1_dgSeason1_ctl00__1']/td/a/text()").extract()
		tr_id_base = "DailyStats1_dgSeason1_ctl00__"
		for num in range(2, 43):
			row = game_record_table.xpath("tr[@id="  + "'" + tr_id_base + str(num) + "']")
			date = row.xpath("td/a/text()").extract()
			if date[0] != "Date":
				td_elems = row.xpath("td/text()").extract()
				#game_log_json[name][date[0]] = {}
				#print str(len(stat_types)) + " " + str(len(td_elems))
				stat_dict = {}
				for stat in range(1, len(stat_types)):
					if len(td_elems) > 0:
						#print stat_types[stat] + " : " + td_elems[stat - 1] 
						#game_log_json[name][date[0]][stat_types[stat]] = td_elems[stat - 1]
						stat_dict[stat_types[stat]] = td_elems[stat - 1]

				#filter out bad rows
				if "wRC+" in stat_dict and stat_dict["wRC+"] != u'\xa0':
					game_log_json[name][date[0]] = stat_dict
				elif "wRC+" not in stat_dict:
					game_log_json[name][date[0]] = stat_dict

		#print json.dumps(game_log_json)
		split_name = name.split(" ")
		with open (split_name[0] + "_" + split_name[1] + "_FG.json", "w") as f:
			json.dump(game_log_json, f)

