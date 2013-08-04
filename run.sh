#!/bin/bash

mkfifo stream.avi

rtmpdump -v -r rtmp://h2j2.rtp.pt/livetv -W http://www.rtp.pt/play/player.swf -p http://www.rtp.pt/services/rtpplay/pub/config_page/rtp.pt/play/direto/tv/2ch5h264 --playpath "2ch5h264" -b 20000 | ffmpeg -i pipe:0 -y -loglevel debug -b:v 400k -stats stream2.avi;



