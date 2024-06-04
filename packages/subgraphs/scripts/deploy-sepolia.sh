#!/bin/bash

source .env

# Check if all required variables are set
if [ -z "$VERSION_LABEL_SEPOLIA" ]; then
  echo "VERSION_LABEL_SEPOLIA is not set"
  exit 1
fi

if [ -z "$DEPLOY_KEY_SEPOLIA" ]; then
  echo "DEPLOY_KEY_SEPOLIA is not set"
  exit 1
fi

# Deploy to Sepolia
graph deploy ees-sepolia --network sepolia --version-label $VERSION_LABEL_SEPOLIA --node https://subgraphs.alchemy.com/api/subgraphs/deploy --deploy-key $DEPLOY_KEY_SEPOLIA --ipfs https://ipfs.satsuma.xyz
