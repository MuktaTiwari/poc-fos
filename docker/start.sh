#!/bin/sh
set -e

# Start Next.js in the background, bind to localhost
cd /app
HOSTNAME=127.0.0.1 PORT=3000 node server.js &
NODE_PID=$!

# Trap to kill node when nginx exits
trap "kill $NODE_PID 2>/dev/null || true" EXIT

# Start nginx in the foreground
nginx -g 'daemon off;'
