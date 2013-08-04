#!/bin/bash

rtmpdump.exe -v -r rtmp://edge.isearch.to/edge -W http://player.ilive.to/ilive-plugin.swf --playpath "xoaaohmeuajfeyf.flv" -R --live -b 20000 -V | vlc.exe --file-caching=50000 -
