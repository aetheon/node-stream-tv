
var _ = require("lodash"),
	mustache = require("mustache"),
	child = require("child_process");

var runningPid = 0;



var Player = {

	/*
	 * gets the VLC command for the given definition
	 *
	 */
	getCommand: function(def){

		var vlc = "vlc",
			vlcTemplate = '{{& vlc }} --fullscreen --file-caching="{{& vlcBuffer}}" --no-video-deco --no-embedded-video --aspect-ratio="16:9" {{& file }}',
			leftCommand = null;
			
		if(!def.vlc){
			def.vlc = vlc;
		}

		// if is rtmp use rtmpdump to pipe
		if(def.rtmp){
			def.other = def.other || "";

			if(def.playpath)
				def.other = mustache.render(' --playpath "{{& playpath}}"', def);

			if(def.token)
				def.other += mustache.render(' --token "{{& token}}"', def);

			if(def.app)
				def.other += mustache.render(' --app "{{& app}}"', def);

			if(def.conn)
				def.other += mustache.render(' --conn "{{& conn}}"', def);

			if(def.flashVer)
				def.other += mustache.render(' --flashVer "{{& flashVer}}"', def);

			if(def.other)
				def.other = def.other.trim();

			// use rtmpdump to pipe data to vlc
			leftCommand = 'rtmpdump -v -r "{{& rtmp}}" -W "{{& swf}}" -p "{{& page}}" {{& other}} --live -b "{{& rtmpBuffer}}" -V';
		}

		// overwrite file definition if any
		if(leftCommand){
			// get data from pipe
			def.file = "-";
		}

		// render command
		var cmd = mustache.render(vlcTemplate, def);
		if(leftCommand){
			cmd = mustache.render(leftCommand, def) + "|" + cmd;
		}

		return cmd;

	},

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
		

		// build the command string
		var cmd = Player.getCommand(options);

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
					errorCallback(options);
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


