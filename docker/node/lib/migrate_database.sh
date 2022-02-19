#!/bin/bash

docker-compose --file "docker-compose.yml" up --detach postgres

docker-compose --file "docker-compose.production.yml" run \
  --entrypoint "/bin/sh -c 'yarn workspace @pbbg/database-service deploy'" \
  --rm \
  node
