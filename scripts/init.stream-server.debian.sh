#! /bin/sh

case "$1" in
  start)
    stream-server
    ;;
  stop)
    killall -9 stream-server
    ;;
  *)
    echo "Usage: /etc/init.d/init.stream-server {start|stop}"
    exit 1
    ;;
esac

exit 0