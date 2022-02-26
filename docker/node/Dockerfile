# --- Base --------------------------------------

FROM node:gallium-alpine AS base

WORKDIR /home/node

# --- Sourcer -----------------------------------

FROM base AS sourcer

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=@pbbg/server --docker

# --- Dependencies ------------------------------

FROM base AS dependencies

COPY --from=sourcer /home/node/out/json/ .

COPY --from=sourcer /home/node/out/yarn.lock .

COPY --from=sourcer /home/node/turbo.json .

COPY --from=sourcer /home/node/out/full/services/database/prisma/ ./services/database/prisma

RUN --mount=type=cache,target=.yarn-cache YARN_CACHE_FOLDER=.yarn-cache \
  yarn install --frozen-lockfile --ignore-scripts --prefer-offline --production

RUN yarn workspace @pbbg/database-service generate

# --- Runtime -----------------------------------

FROM base

ENV NODE_ENV=production

COPY --from=dependencies /home/node/ .

WORKDIR /home/node/applications/server

ENTRYPOINT /bin/sh /home/node/docker/node/lib/entrypoint.sh
