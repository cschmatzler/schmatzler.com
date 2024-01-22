VERSION 0.8

node-base:
  FROM node:21.6.0-bookworm-slim

  WORKDIR /medium-place

  COPY --keep-ts package.json package-lock.json .
  RUN npm ci

  SAVE ARTIFACT package.json AS LOCAL package.json
  SAVE ARTIFACT package-lock.json AS LOCAL package-lock.json

COPY_SOURCES:
  FUNCTION

  COPY --keep-ts --dir public src .
  COPY --keep-ts astro.config.ts tailwind.config.ts tsconfig.json .

ci:
  BUILD +check-format
  BUILD +lint

check-format:
  FROM +node-base

  DO +COPY_SOURCES
  COPY --keep-ts prettier.config.mjs .

  RUN npx prettier --check .

lint:
  FROM +node-base

  DO +COPY_SOURCES
  COPY --keep-ts biome.json .

  RUN npx @biomejs/biome lint .

release:
  FROM +node-base

  DO +COPY_SOURCES

  RUN npx astro build

  SAVE ARTIFACT dist AS LOCAL dist
