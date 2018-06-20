#!/usr/bin/env bash
set -e

SRC='./src/images'
OUT='./src/components/svg'

# Usage: svgr [-d out-dir] [src-dir]
./node_modules/@svgr/cli/bin/svgr --icon -d $OUT $SRC
