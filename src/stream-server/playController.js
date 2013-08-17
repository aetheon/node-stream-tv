
var _ = require('lodash'),
	settings = require('../stream-tv/settings'),
	run = require('../stream-tv/run');

module.exports = function(app){

	var currentChannelIndex = 0,
		currentPlayingPid = 0,
		channelsHash = settings.getChannels();
		channelsArray = _.values(channelsHash);


	/*
	 * setCurrentIndex
	 */

	var setCurrentIndex = function(index){

		if(index > channelsArray.length){
			index = 0;
		}

		currentChannelIndex = index;

	};

	/*
	 * getChannelDef
	 */
	 var getChannelDef = function(indexOrName){

	 	var settingsFileName = "";
	 	
	 	if( typeof indexOrName == "number"){
	 		settingsFileName = channelsArray[indexOrName];
	 	}

	 	if( typeof indexOrName == "string"){
	 		settingsFileName = channelsHash[indexOrName];
	 	}

	 	var channelDef = settings.getChannel(settingsFileName);

	 	return channelDef;

	 };


	/*
	 * Play
	 */
	var play = function(channelDef){

		if(currentPlayingPid)
			try{ process.kill(c.pid); } catch(e){ }

		var process = run(channelDef);

		currentPlayingPid = process.pid;
	};


	/*
	 * Controller urls
	 *
	 */

	app.get('/next', function(req, res){
	  
	  // run channel
	  var channelDefFile = getChannelDef(currentChannelIndex);
	  setCurrentIndex(currentChannelIndex++);
	  play(channelDefFile);

	  res.redirect('/');
	  
	});


	app.get('/prev', function(req, res){
	  
	  // run channel
	  var channelDefFile = getChannelDef(currentChannelIndex);
	  setCurrentIndex(currentChannelIndex--);

	  play(channelDefFile);
	  
	  res.redirect('/');
	  
	});

	app.get('/play', function(req, res){
	  
	  var channel = req.query.channel;
	  // run channel
	  var channelDefFile = getChannelDef(channel);
	  play(channelDefFile);

	  res.redirect('/');
	  
	});


}