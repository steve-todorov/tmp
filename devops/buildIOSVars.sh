#!/bin/bash

# Declare an associative array so we can easily output all definitions later and pass it to Github Actions.
declare -A vars

# Allow running locally and in GitHub
vars["TEMP"]="${RUNNER_TEMP:-${TMPDIR:-$(dirname $(mktemp))}}"

# Is force release
vars["IS_FORCE_RELEASE"]=${1:-false}

# Signature related
vars["KEYCHAIN_FILE"]="${vars["TEMP"]}/keychain.keychain-db"
vars["CERTIFICATE_FILE"]="${vars["TEMP"]}/certificate.p12"
vars["PROVISIONING_PROFILE_FILE"]="${vars["TEMP"]}/provisioning-profile.mobileprovision"

# Build related
vars["APP_PATH"]="./packages/app/ios/App"
vars["APP_BUILD_PATH"]="${vars["APP_PATH"]}/build"
vars["APP_ARCHIVE_FILE"]="${vars["APP_BUILD_PATH"]}/App.xcarchive"
vars["APP_IPA_FILE"]="${vars["APP_BUILD_PATH"]}/App.ipa"
vars["APP_EXPORT_OPTIONS_RELEASE_FILE"]="./packages/app/ios/App/exportOptionsRelease.plist"

# Output all variables
for var in "${!vars[@]}"; do
  echo "$var=${vars[$var]}"
done
