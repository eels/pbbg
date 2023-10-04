# --- Downloader --------------------------------

FROM alpine:3 AS downloader

ARG TARGETARCH
ARG TARGETOS
ARG VERSION="0.18.9"

ENV BUILDX_ARCH="${TARGETOS:-linux}_${TARGETARCH:-amd64}"

RUN apk add --no-cache ca-certificates unzip wget zip zlib-dev

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && unzip pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && chmod +x /pocketbase

COPY ./pb_migrations /pb_migrations

# --- Runtime -----------------------------------

FROM scratch

EXPOSE 8090

COPY --from=downloader /pocketbase /usr/local/bin/pocketbase

COPY --from=downloader /pb_migrations /pb_migrations

ENTRYPOINT ["/usr/local/bin/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--migrationsDir=/pb_migrations", "--publicDir=/pb_public"]
