#!/usr/bin/env bash

set -e;

aws s3 sync ./public s3://beta.matthiaskretschmann.com --delete --acl public-read

echo "---------------------------------------------"
echo "         ✓ done deployment "
echo "---------------------------------------------"

exit;
