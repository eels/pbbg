#!/bin/bash

echo "# -- Start ---------------------------------------"

export DOLLAR="$"

envsubst < /home/nginx/config/default.conf > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"

while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g "daemon off;"
