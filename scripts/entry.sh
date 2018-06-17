#!/usr/bin/env bash
set -e

export PATH="$PATH:/usr/local/bin/gatsby"

# echo "Running npm install..."
# npm install

# rm -rf ./public
gatsby develop --host 0.0.0.0
