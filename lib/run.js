
var _ = require("lodash"),
	mustache = require("mustache"),
	child = require("child_process");

// IMPORTANT: in osx alias to vlc doesn't work
var vlc = "vlc";

var commandTemplate = 'rtmpdump -v -r "{{& rtmp}}" -W "{{& swf}}" -p "{{& page}}" --playpath "{{& playpath}}" --live -b "{{& rtmpBuffer}}" -V | {{& vlc }} --fullscreen --file-caching="{{& vlcBuffer}}" -';


/*
 * Runner function to rtmp dump
 *
 */
module.exports = function(options){
	'use strict';

	var defaults = {
		rtmp: "",
		swf: "",
		page: "",
		playpath: "",
		rtmpBuffer: 2000,
		vlcBuffer: 2000
	};

	options = _.merge({}, defaults, options );
	options.vlc = vlc;

	// build the command string
	var cmd = mustache.render(commandTemplate, options);

	// start seeing
	//var child = process.exec(cmd);
	var c = child.exec(cmd);
	c.stderr.pipe(process.stderr);
	c.stdout.pipe(process.stdout);
	
	c.on("close", function(){
		process.kill(child.pid);
		process.exit();
	});

	c.on("data", function(data){
		console.log(data);
	});

	return child;
	
};