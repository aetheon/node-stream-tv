#!/bin/sh

rtmpdump -v -r rtmp://h2j2.rtp.pt/livetv -W http://www.rtp.pt/play/player.swf -p http://www.rtp.pt/services/rtpplay/pub/config_page/rtp.pt/play/direto/tv/2ch5h264 --playpath "2ch5h264" -R --live -b 1000 -V -o static.flv;
