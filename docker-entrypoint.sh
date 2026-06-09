#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "[entrypoint] Running prisma db push..."
  if ./node_modules/.bin/prisma db push --skip-generate; then
    echo "[entrypoint] prisma db push succeeded."
  else
    echo "[entrypoint] WARNING: prisma db push failed; starting server anyway."
  fi
else
  echo "[entrypoint] DATABASE_URL not set; skipping prisma db push."
fi

exec node server.js
