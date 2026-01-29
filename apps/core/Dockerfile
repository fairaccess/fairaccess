ARG BASE_IMAGE=scratch
ARG BUILDER_FROM_PLATFORM=linux/arm64

FROM --platform=$BUILDER_FROM_PLATFORM ${BASE_IMAGE} AS builder

FROM oven/bun:1.3.8 AS base
WORKDIR /usr/src/app

FROM base AS release
COPY --from=builder /usr/src/app/apps/core/dist ./dist
COPY --from=builder /usr/src/app/apps/core/scripts ./scripts
COPY --from=builder /usr/src/app/libs/db/src/db/migrations ./migrations

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "dist/index.js" ]
