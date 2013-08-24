#!/usr/bin/env node

var _ = require('lodash'),
	Player = require('../src/stream-tv/player.js');
	settings = require('../src/stream-tv/settings.js');


// initializing
var args = process.argv,
	settings = settings.getChannels();


// get settings name from input
var settingName = "";
if(args.length > 2)	settingName = settings[args[2]];

// stop player on exit
process.on('SIGINT', function() {
	Player.stop(function(){
		process.exit();	
	});
});

// Main switch
switch(settingName){

	case "":
	case null:
	case undefined:
		// show usage help
		console.log("\n\t USAGE: \n");
		_.each(
			_.keys(settings),
			function(s){
				console.log("\t > stream-tv", s);
			}
		);

		console.log("\n");
		break;

	default:
		// stream the given setting
		var setting = require("../settings/" + settingName);
		Player.play(setting);
		break;
};
