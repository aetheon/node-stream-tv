#!/bin/bash

rtmpdump -v -r rtmp://h2j2.rtp.pt/livetv -W http://www.rtp.pt/play/player.swf -p http://www.rtp.pt/services/rtpplay/pub/config_page/rtp.pt/play/direto/tv/rtp1 --playpath "2ch5h264" --live -b 20000 -V | vlc --file-caching=20000 -
