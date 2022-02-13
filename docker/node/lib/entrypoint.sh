#!/bin/bash

echo "# --- Start --------------------------------------"

yarn workspace @pbbg/database-service deploy

yarn workspace @pbbg/database-service generate

node build/index.js
