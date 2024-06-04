#!/bin/bash

source .env

# Check if all required variables are set
if [ -z "$VERSION_LABEL_BASE" ]; then
  echo "VERSION_LABEL_SEPOLIA is not set"
  exit 1
fi

# Deploy to Base
graph deploy --studio ees-base --version-label $VERSION_LABEL_BASE

