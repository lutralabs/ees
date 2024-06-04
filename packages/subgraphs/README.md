# Subgraphs

## Local development

### Steps

1. Run anvil `anvil --hardfork cancun --fork-url $SEPOLIA_RPC_URL --fork-block-number 6037898 -b 1`
2. Run `pnpm clean` && `pnpm deploy:local` inside `/packages/contracts`
3. Delete `data` folder if it exists
4. Run containers `docker compose up -d --force-recreate --build``
5. Build subgraph `pnpm build`
6. Create local subgraph `pnpm create-local`
7. Deploy local subgraph `pnpm deploy-local` (The GraphiQL interface should be available at http://localhost:8000/subgraphs/name/ees/graphql)
8. Run `pnpm compile` inside `/packages/dapp`
