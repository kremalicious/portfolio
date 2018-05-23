#!/usr/bin/env bash
#
# required environment variables:
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
# AWS_S3_BUCKET
#
set -e;

##
## check for pull request against master
##
if [ "$TRAVIS_PULL_REQUEST" != "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

    aws s3 sync \
      --delete \
      --acl public-read \
      ./public s3://"$AWS_S3_BUCKET_BETA"

##
## check for master push which is no pull request
##
elif [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] || [ "$TRAVIS" != true ]; then

  aws s3 sync \
    --delete \
    --acl public-read \
    ./public s3://"$AWS_S3_BUCKET"

  echo "---------------------------------------------"
  echo "         ✓ done deployment "
  echo "---------------------------------------------"

  exit;

else

  echo "---------------------------------------------"
  echo "          nothing to deploy "
  echo "---------------------------------------------"

fi
