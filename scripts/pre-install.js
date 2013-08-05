#!/usr/bin/env node

var process = require("child_process");

var vlcp = process.exec("vlc --help");
if( !vlcp.pid )
    // java needed to compute the movie hash
    throw Error("Error: vlc was not found");


var rtmpp = process.exec("rtmpdump -v");
if( !rtmpp.pid )
    // java needed to compute the movie hash
    throw Error("Error: rtmpdump was not found");