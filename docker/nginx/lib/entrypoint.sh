#!/bin/bash

export DOLLAR="$"

CONFIG_TEMP=/home/nginx/config/default.temp.conf
CONFIG_PROD=/home/nginx/config/default.prod.conf

[[ $1 = "temp" ]] && CONFIG_FILE="$CONFIG_TEMP" || CONFIG_FILE="$CONFIG_PROD"

envsubst < "$CONFIG_FILE" > /etc/nginx/conf.d/default.conf

while :; do sleep 6h; nginx -s reload; done & exec nginx -g "daemon off;"
