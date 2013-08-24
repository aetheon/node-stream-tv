#!/usr/bin/env node

var process = require("child_process");

var vlcp = process.exec("vlc --help");
if( !vlcp.pid )
    throw Error("Error: vlc was not found");


var rtmpp = process.exec("rtmpdump -v");
if( !rtmpp.pid )
    throw Error("Error: rtmpdump was not found");