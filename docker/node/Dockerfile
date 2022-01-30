# --- Base --------------------------------------

FROM node:gallium-alpine AS base

WORKDIR /home/node/app

# --- Sourcer -----------------------------------

FROM base AS sourcer

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=@pbbg/server --docker

# --- Dependencies ------------------------------

FROM base AS dependencies

COPY --from=sourcer /home/node/app/out/json/ .

COPY --from=sourcer /home/node/app/out/yarn.lock ./yarn.lock

RUN --mount=type=cache,target=.yarn-cache YARN_CACHE_FOLDER=.yarn-cache \
  yarn install --ignore-scripts --prefer-offline

# --- Production Dependencies -------------------

FROM base AS production_dependencies

COPY --from=sourcer /home/node/app/out/json/ .

COPY --from=sourcer /home/node/app/out/yarn.lock ./yarn.lock

COPY --from=dependencies /home/node/app/ .

RUN --mount=type=cache,target=.yarn-cache YARN_CACHE_FOLDER=.yarn-cache \
  yarn install --ignore-scripts --prefer-offline --production

# --- Builder -----------------------------------

FROM base AS builder

COPY --from=dependencies /home/node/app/ .

COPY --from=sourcer /home/node/app/out/full/ .

COPY --from=sourcer /home/node/app/turbo.json .

RUN rm -fr /home/node/app/applications/server/.parcel-cache

RUN yarn turbo run build --scope=@pbbg/server --include-dependencies --no-deps

# --- Runtime -----------------------------------

FROM base

ENV NODE_ENV=production

COPY --from=production_dependencies /home/node/app/ .

WORKDIR /home/node/app/applications/server

COPY --from=builder /home/node/app/applications/server/build/ ./build/

CMD yarn start
