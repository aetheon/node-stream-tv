#!/usr/bin/env node

var server = require("../src/stream-server/server.js"),
	Player = require('../src/stream-tv/player.js');

// get port from args 
var port = 80;
if(process.argv.length > 2)
	port = Number(process.argv[2]) || 80;

// stop player on exit
process.on('SIGINT', function() {
	Player.stop();
	process.exit();
});

server.run(port);
