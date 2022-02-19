#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Error: docker-compose is not installed" >&2
  exit 1
fi

if ! [ -f ".env" ]; then
  echo "Error: Required environment variables file not found" >&2
  exit 1
fi

export "$(echo "$(cat .env | sed 's/#.*//g'| xargs)" | envsubst)"

data_path="./docker/certbot/data"
domain="$APP_SERVER_DOMAIN"
email="$APP_ADMIN_EMAIL"
rsa_key_size=4096
staging="$APP_CERTBOT_DEBUG"

if [ -d "$data_path/conf/live/$domain" ]; then
  echo "Required Certbot files already exist, exiting successfully" >&2
  exit 0
fi

ssl_config_path="$data_path/conf/options-ssl-nginx.conf"
ssl_dhparams_path="$data_path/conf/ssl-dhparams.pem"

if [ ! -e "$ssl_config_path" ] || [ ! -e "$ssl_dhparams_path" ]; then
  github_domain="https://raw.githubusercontent.com"
  ssl_config_repo="$github_domain/certbot/certbot/master/certbot-nginx/certbot_nginx"
  ssl_dhparams_repo="$github_domain/certbot/certbot/master/certbot/certbot"

  ssl_config="$ssl_config_repo/_internal/tls_configs/options-ssl-nginx.conf"
  ssl_dhparams="$ssl_dhparams_repo/ssl-dhparams.pem"

  mkdir -p "$data_path/conf"

  curl -s "$ssl_config" > "$data_path/conf/options-ssl-nginx.conf"
  curl -s "$ssl_dhparams" > "$data_path/conf/ssl-dhparams.pem"
fi

docker-compose --file "docker-compose.production.yml" run \
  --detach \
  --entrypoint "/bin/sh /home/nginx/lib/entrypoint.sh temp" \
  --name "certbot_nginx" \
  --publish 80:80 \
  --rm \
  nginx

if [ "$staging" != "0" ]; then
  staging_arg="--staging";
fi

docker-compose --file "docker-compose.production.yml" run \
  --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg \
      -d $domain \
      --agree-tos \
      --email $email \
      --force-renewal \
      --no-eff-email \
      --rsa-key-size $rsa_key_size" \
  --rm \
  certbot

docker container stop $(docker ps --all --filter "name=certbot_nginx" --quiet)
