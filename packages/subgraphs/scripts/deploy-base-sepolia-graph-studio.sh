#!/bin/bash

source .env

# Check if all required variables are set
if [ -z "$VERSION_LABEL_BASE_SEPOLIA" ]; then
  echo "VERSION_LABEL_SEPOLIA is not set"
  exit 1
fi

# Deploy to Base Sepolia
graph deploy --studio ees-base-sepolia --version-label $VERSION_LABEL_BASE_SEPOLIA

