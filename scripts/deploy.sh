#!/usr/bin/env bash
#
# required environment variables:
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
AWS_S3_BUCKET="matthiaskretschmann.com"
AWS_S3_BUCKET_BETA="beta.matthiaskretschmann.com"
SITEMAP_URL="https%3A%2F%2Fmatthiaskretschmann.com%2Fsitemap.xml"
#
set -e;

function s3sync {
  aws s3 sync ./public s3://"$1" \
    --include "*" \
    --exclude "*.html" \
    --exclude "sw.js" \
    --exclude "*page-data.json" \
    --exclude "*app-data.json" \
    --exclude "chunk-map.json" \
    --exclude "sitemap.xml" \
    --exclude ".iconstats.json" \
    --exclude "humans.txt" \
    --exclude "robots.txt" \
    --cache-control public,max-age=31536000,immutable \
    --delete \
    --acl public-read

  aws s3 sync ./public s3://"$1" \
    --exclude "*" \
    --include "*.html" \
    --include "sw.js" \
    --include "*page-data.json" \
    --include "*app-data.json" \
    --include "chunk-map.json" \
    --include "sitemap.xml" \
    --include ".iconstats.json" \
    --include "humans.txt" \
    --include "robots.txt" \
    --cache-control public,max-age=0,must-revalidate \
    --delete \
    --acl public-read
}

# purge full Cloudflare cache
# https://api.cloudflare.com/#zone-purge-all-files
function purge {
  curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE/purge_cache" \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_KEY" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}'
}

# ping search engines
# returns: HTTP_STATUSCODE URL
function ping {
  curl -sL -w "%{http_code} %{url_effective}\\n" \
    "http://www.google.com/webmasters/tools/ping?sitemap=$SITEMAP_URL" -o /dev/null \
    "http://www.bing.com/webmaster/ping.aspx?siteMap=$SITEMAP_URL" -o /dev/null
}

##
## check for pull request against master
##
if [ "$GITHUB_EVENT_NAME" == "pull_request" ]; then

  s3sync $AWS_S3_BUCKET_BETA

##
## check for master push which is no pull request
##
elif [ "$GITHUB_REF" == "refs/heads/master" ]; then

  s3sync $AWS_S3_BUCKET

  # purge

  ping

  echo "---------------------------------------------"
  echo "         ✓ done deployment "
  echo "---------------------------------------------"

  exit;

else

  echo "---------------------------------------------"
  echo "          nothing to deploy "
  echo "---------------------------------------------"

fi
