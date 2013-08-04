#!/bin/sh

vlc static.mp4 --sout="#std{access=http,mux=ffmpeg{mux=flv},dst=0.0.0.0:8585/stream.mp4}";