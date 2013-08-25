
var _ = require('lodash'),
	Player = require('../stream-tv/player');
	State = require('./state');

module.exports = function(app){

	
	var playErrorCallback = function(channelDef){

		console.log("onError:", channelDef.name);

		var currentPlaying = State.getCurrentChannel();
		if(!currentPlaying || currentPlaying.id != channelDef.id) {
			// ignore if no recorded playing pid
			console.log("Ignoring... no longer playing");
			return;
		}

		console.log("Start playing again...sorry!");

		// hoisted call
		play(currentPlaying);
	}

	/*
	 * Play
	 */
	var play = function(channelDef){

		if(!channelDef)
			return;

		// set 
		State.setCurrentChannel(channelDef);

		Player.stop(
			function(){
				var process = Player.play(channelDef, playErrorCallback);
			}
		);
		
	};


	/*
	 * Controller urls
	 *
	 */

	
	app.get('/play', function(req, res){
	  
	  var channel = req.query.channel;
	  // run channel
	  var channelDef = State.getChannel(channel);
	  
	  console.log("Playing...", channel.name);

	  play(channelDef);

	  res.redirect('/' + "#" + State.getCurrentChannel().id);
	  
	});



	app.get('/next', function(req, res){
	  
	  
	  var current = State.getCurrentChannel() || { index: 0};
	  var nextIndex = current.index++;
	  var channel = State.getChannel(nextIndex);

	  console.log("Playing...", nextIndex, channel);

	  play(channel);

	  res.redirect('/' + "#" + State.getCurrentChannel().id);
	  
	});


	app.get('/prev', function(req, res){
	  
	  
	  var current = State.getCurrentChannel() || { index: -1};
	  var prevIndex = current.index--;
	  var channel = State.getChannel(prevIndex);

	  console.log("Playing...", prevIndex, channel.name);

	  play(channel);

	  res.redirect('/' + "#" + State.getCurrentChannel().id);
	  
	});


}