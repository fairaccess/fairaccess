#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  DB_DIR=$(dirname "$DATABASE_URL")
  mkdir -p "$DB_DIR"
  chown -R bun:bun "$DB_DIR"
fi

if [ "$1" = "migrate" ]; then
  echo "Running database migrations..."
  exec su bun -c "bun run dist/migrate.js"
else
  echo "Starting server..."
  exec su bun -c "bun run dist/index.js"
fi
