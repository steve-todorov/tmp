#!/bin/bash

# Just to be extra safe.
PASSWORD="bazing"
echo "::add-mask::${PASSWORD}"

echo "top_secret=${PASSWORD}" >> "$GITHUB_OUTPUT"
