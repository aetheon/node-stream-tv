
var _ = require("lodash"),
	mustache = require("mustache"),
	child = require("child_process");

// IMPORTANT: in osx alias to vlc doesn't work
var vlc = "vlc",
	commandTemplate = 'rtmpdump -v -r "{{& rtmp}}" -W "{{& swf}}" -p "{{& page}}" {{& other}} --live -b "{{& rtmpBuffer}}" -V | {{& vlc }} --fullscreen --file-caching="{{& vlcBuffer}}" --no-video-deco --no-embedded-video -';

var runningPid = 0;

var Player = {

	stop: function(callback) {

		if(runningPid){
			try{ 
				process.kill(c.pid); 
			} catch(e){}
			finally { 
				runningPid = 0; 
			}
		}

		// kill rtmpdump
		console.log("Stopping rtmpdump.");
		var r = child.exec("killall -9 rtmpdump"); //, function(error, stdout, stderr){ console.log(error, stdout, stderr); });
		r.on("exit", function(){
		
			console.log("Stopping vlc.");
			var v = child.exec("killall -9 vlc"); //, function(error, stdout, stderr){ console.log(error, stdout, stderr); });

			v.on("exit", function(){
				
				if(callback){
					callback();
				}

			});

		});

		

	},

	/*
	* play
	*
	*/
	play: function(options, errorCallback){
		'use strict';

		var defaults = {
			rtmp: "",
			swf: "",
			page: "",
			playpath: "",
			token: "",
			rtmpBuffer: 2000,
			vlcBuffer: 2000
		};

		options = _.merge({}, defaults, options );
		options.vlc = vlc;

		if(options.playpath)
			options.other = mustache.render(' --playpath "{{& playpath}}"', options);

		if(options.token)
			options.other += mustache.render(' --token "{{& token}}"', options);

		if(options.other)
			options.other = options.other.trim();

		// build the command string
		var cmd = mustache.render(commandTemplate, options);

		// print cmd
		console.log("Running:", cmd);
		
		// start seeing
		//var child = process.exec(cmd);
		var c = child.exec(cmd);

		// save the runnig child pid
		runningPid = c.pid;

		//c.stderr.pipe(process.stderr);
		//c.stdout.pipe(process.stdout);
		
		c.on("close", function(){
			try { 
				if(errorCallback){
					errorCallback();
				}
			}
			catch(e){
			}
			//process.exit();
		});

		c.on("data", function(data){
			console.log(data);
		});

		return c;
		
	}


};

module.exports = Player;


