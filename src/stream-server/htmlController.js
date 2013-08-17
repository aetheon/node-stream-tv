
var _ = require('lodash'),
	settings = require('../stream-tv/settings');

module.exports = function(app){

	var channelsHash = settings.getChannels(),
		channelsArray = [];

	_.each(
		_.keys(channelsHash), 
		function(key){
			var channel = settings.getChannel(channelsHash[key]);
			channel.file = key;
			channelsArray.push(channel);
	});

	/*
	 * Controller urls
	 *
	 */

	app.get('/', function(req, res){
	  
	  res.render("index.html", { channels: channelsArray });

	});


}