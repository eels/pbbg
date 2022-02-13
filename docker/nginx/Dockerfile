# --- Base --------------------------------------

FROM nginx:mainline-alpine

RUN apt-get install nginx-plus-module-brotli

ENTRYPOINT /bin/sh /home/nginx/lib/entrypoint.sh
