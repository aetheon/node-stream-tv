#!/bin/bash

rtmpdump.exe -v -r rtmp://h2j2.rtp.pt/livetv -W http://www.rtp.pt/play/player.swf -p http://www.rtp.pt/services/rtpplay/pub/config_page/rtp.pt/play/direto/tv/rtp-informação --playpath "2ch64h264" -R --live -b 20000 -V | vlc.exe --file-caching=50000 -