#!/bin/bash

# Just to be extra safe.
PASSWORD="bazing"
echo "::add-mask::${PASSWORD}"

OUTPUT_PREFIX=$1

cat <<EOF
${OUTPUT_PREFIX}_jdbc=example1
${OUTPUT_PREFIX}_pass=$PASSWORD
EOF

echo "top_secret=${PASSWORD}" >> "$GITHUB_OUTPUT"
