#!/usr/bin/env node

var server = require("../src/stream-server/server.js"),
	Player = require('../src/stream-tv/player.js');

// stop player on exit
process.on('SIGINT', function() {
	Player.stop();
	process.exit();
});

server.run(8282);
