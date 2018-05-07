#!/usr/bin/env bash

set -e;

aws s3 sync \
  --delete \
  --acl public-read \
  ./public \
  s3://matthiaskretschmann.com

echo "---------------------------------------------"
echo "         ✓ done deployment "
echo "---------------------------------------------"

exit;
