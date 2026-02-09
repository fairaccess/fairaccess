#!/bin/sh
set -e

if [ "$1" = "migrate" ]; then
  echo "Running database migrations..."
  exec bun run dist/migrate.js
else
  echo "Starting server..."
  exec bun run dist/index.js
fi
