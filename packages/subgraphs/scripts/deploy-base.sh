#!/bin/bash

source .env

# Check if all required variables are set
if [ -z "$VERSION_LABEL_BASE" ]; then
  echo "VERSION_LABEL_BASE is not set"
  exit 1
fi

if [ -z "$DEPLOY_KEY_BASE" ]; then
  echo "DEPLOY_KEY_BASE is not set"
  exit 1
fi

# Deploy to Base
graph deploy ees-base --network base --version-label $VERSION_LABEL_BASE --node https://subgraphs.alchemy.com/api/subgraphs/deploy --deploy-key $DEPLOY_KEY_BASE --ipfs https://ipfs.satsuma.xyz
