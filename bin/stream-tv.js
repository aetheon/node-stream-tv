#!/usr/bin/env node

var _ = require('lodash'),
	runner = require('../lib/run.js');
	helpers = require('../lib/helpers.js');


// initializing
var args = process.argv,
	settings = helpers.getAllSettings();


// get settings name from input
var settingName = "";
if(args.length > 2)	settingName = settings[args[2]];


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
				console.log("\t > stream.tv", s);
			}
		);

		console.log("\n");
		break;

	default:
		// stream the given setting
		var setting = require("../settings/" + settingName);
		runner(setting);
		break;
};
