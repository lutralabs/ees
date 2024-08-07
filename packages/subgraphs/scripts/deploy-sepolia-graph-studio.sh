#!/bin/bash

source .env

# Check if all required variables are set
if [ -z "$VERSION_LABEL_SEPOLIA" ]; then
  echo "VERSION_LABEL_SEPOLIA is not set"
  exit 1
fi

# Deploy to Sepolia
graph deploy --network sepolia --studio ees-sepolia --version-label $VERSION_LABEL_SEPOLIA

