#!/bin/bash

# -- Inspiration --------------------------------
# -- https://github.com/wmnnd/nginx-certbot
# -- https://tinyurl.com/4acwhf3k

if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Error: docker-compose is not installed." >&2
  exit 1
fi

if [ -f ".env" ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

data_path="./docker/certbot/data"
domain="$APP_SERVER_DOMAIN"
email="$APP_ADMIN_EMAIL"
rsa_key_size=4096
staging="$APP_CERTBOT_DEBUG"

if [ -d "$data_path" ]; then exit; fi

ssl_config_path="$data_path/conf/options-ssl-nginx.conf"
ssl_dhparams_path="$data_path/conf/ssl-dhparams.pem"

if [ ! -e "$ssl_config_path" ] || [ ! -e "$ssl_dhparams_path" ]; then
  echo "# --- Downloading recommended TLS parameters -----"

  github_domain="https://raw.githubusercontent.com"
  ssl_config_repo="$github_domain/certbot/certbot/master/certbot-nginx/certbot_nginx"
  ssl_dhparams_repo="$github_domain/certbot/certbot/master/certbot/certbot"

  ssl_config="$ssl_config_repo/_internal/tls_configs/options-ssl-nginx.conf"
  ssl_dhparams="$ssl_dhparams_repo/ssl-dhparams.pem"

  mkdir -p "$data_path/conf"

  curl -s "$ssl_config" > "$data_path/conf/options-ssl-nginx.conf"
  curl -s "$ssl_dhparams" > "$data_path/conf/ssl-dhparams.pem"

  echo
fi

echo "# --- Creating dummy certificate -----------------"

path="/etc/letsencrypt/live/$domain"

mkdir -p "$data_path/conf/live/$domain"

docker-compose --file "docker-compose.production.yml" \
  run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
      -keyout '$path/privkey.pem' \
      -out '$path/fullchain.pem' \
      -subj '/CN=localhost'" \
  certbot

echo
echo "# --- Starting Nginx -----------------------------"

docker-compose --file "docker-compose.production.yml" \
  up --force-recreate --detach nginx

echo
echo "# --- Deleting dummy certificate -----------------"

docker-compose --file "docker-compose.production.yml" \
  run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domain && \
    rm -Rf /etc/letsencrypt/archive/$domain && \
    rm -Rf /etc/letsencrypt/renewal/$domain.conf" \
  certbot

echo
echo "# --- Requesting certificate ---------------------"

domain_args=""
email_arg="--email $email --no-eff-email"

if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker-compose --file "docker-compose.production.yml" \
  run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg $email_arg \
      -d $domain \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --force-renewal" \
  certbot

echo
echo "# --- Stopping Nginx -----------------------------"

docker-compose --file "docker-compose.production.yml" \
  exec nginx nginx -s stop
