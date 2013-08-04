#!/bin/sh

ffmpeg -i static.flv -y -b:500k -o static.avi;
