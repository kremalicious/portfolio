#!/usr/bin/env bash
set -e

SRC='./src/images'
OUT='./src/components/svg'

printf "Creating SVG components...\\n\\n"

# Usage: svgr [-d out-dir] [src-dir]
./node_modules/@svgr/cli/bin/svgr --icon -d $OUT $SRC

printf "\\n🎉 Successfully created SVG components\\n\\n"
