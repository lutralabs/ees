#!/bin/bash

source .env

# Check if all required variables are set
if [ -z "$VERSION_LABEL_BASE_SEPOLIA" ]; then
  echo "VERSION_LABEL_BASE_SEPOLIA is not set"
  exit 1
fi

if [ -z "$DEPLOY_KEY_BASE_SEPOLIA" ]; then
  echo "DEPLOY_KEY_BASE_SEPOLIA is not set"
  exit 1
fi

# Deploy to Base Sepolia
graph deploy ees-base-sepolia --network base-sepolia --version-label $VERSION_LABEL_BASE_SEPOLIA --node https://subgraphs.alchemy.com/api/subgraphs/deploy --deploy-key $DEPLOY_KEY_BASE_SEPOLIA --ipfs https://ipfs.satsuma.xyz
