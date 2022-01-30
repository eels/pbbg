#!/usr/bin/env bash

# -- Source -------------------------------------
# -- https://github.com/wmnnd/nginx-certbot
# -- https://tinyurl.com/4acwhf3k

if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Error: docker-compose is not installed." >&2
  exit 1
fi

data_path="./docker/certbot/data"
domains=("$APP_SERVER_DOMAIN")
email="$APP_ADMIN_EMAIL"
rsa_key_size=4096
staging=1

if [ -d "$data_path" ]; then exit; fi

ssl_config_path="$data_path/conf/options-ssl-nginx.conf"
ssl_dhparams_path="$data_path/conf/ssl-dhparams.pem"

if [ ! -e "$ssl_config_path" ] || [ ! -e "$ssl_dhparams_path" ]; then
  echo "# --- Downloading recommended TLS parameters -----"

  github_domain="https://raw.githubusercontent.com"
  ssl_config_repo="$github_domain/certbot/certbot/master/certbot-nginx/certbot_nginx"
  ssl_dhparams_repo="$github_domain/certbot/certbot/master/certbot/certbot"
  ssl_config="$certbot_repo/_internal/tls_configs/options-ssl-nginx.conf"
  ssl_dhparams="$certbot_repo/ssl-dhparams.pem"

  mkdir -p "$data_path/conf"

  curl -s "$ssl_config" > "$data_path/conf/options-ssl-nginx.conf"
  curl -s "$ssl_dhparams" > "$data_path/conf/ssl-dhparams.pem"

  echo
fi

echo "# --- Creating dummy certificate for $domains ----"

path="/etc/letsencrypt/live/$domains"

mkdir -p "$data_path/conf/live/$domains"

docker-compose --file "docker-compose.yml" --file "docker-compose.production.yml" \
  run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
      -keyout '$path/privkey.pem' \
      -out '$path/fullchain.pem' \
      -subj '/CN=localhost'" \
  certbot

echo
echo "# --- Starting Nginx -----------------------------"

docker-compose --file "docker-compose.yml" --file "docker-compose.production.yml" \
  up --force-recreate -d nginx

echo
echo "# --- Deleting dummy certificate for $domains ----"

docker-compose --file "docker-compose.yml" --file "docker-compose.production.yml" \
  run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domains && \
    rm -Rf /etc/letsencrypt/archive/$domains && \
    rm -Rf /etc/letsencrypt/renewal/$domains.conf" \
  certbot

echo
echo "# --- Requesting certificate for $domains --------"

domain_args=""
email_arg="--email $email"

for domain in "${domains[@]}"; do domain_args="$domain_args -d $domain"; done

if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker-compose --file "docker-compose.yml" --file "docker-compose.production.yml" \
  run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg $email_arg $domain_args \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --force-renewal" \
  certbot

echo
echo "# --- Stopping Nginx -----------------------------"

docker-compose --file "docker-compose.yml" --file "docker-compose.production.yml" \
  exec nginx nginx -s stop
