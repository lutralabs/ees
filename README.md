# EES - Ethereum Endorsement Service

## Intro to monorepo

The monorepo consists of three main parts:
* [Contracts](packages/contracts)
* [Dapp](packages/dapp)
* [Subgraphs](packages/subgraphs)

## Getting started

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
```

## Deployed contracts and EAS schemas

### EESCore deployed contracts:

* Mainnet: TODO
* Base: TODO
* Sepolia: [0x306aa8b6640A4Ef12919Ed97b5d85c006DD68796](https://sepolia.etherscan.io/address/0x306aa8b6640A4Ef12919Ed97b5d85c006DD68796)
* Base Sepolia: [0x63F610a03Caa82ca32386BDb6F447a93d4D6F6e7](https://sepolia.basescan.org/address/0x63F610a03Caa82ca32386BDb6F447a93d4D6F6e7)

For deployed EAS contracts see [EAS deployments](https://docs.attest.org/docs/quick--start/contracts)

Our deployed schemas can be found in [deploy script](packages/contracts/scripts/deployCore.ts#L12)

## Contracts

When deploying contracts, you need to set some hardhat variables. Variables are stored in `hardhat-nodejs/vars.json` , depending on your OS.
Available variables are:

RPC urls:
* `SEPOLIA_RPC_URL`
* `AMOY_RPC_URL`

Private keys:
* `AMOY_PRIVATE_KEY`
* `SEPOLIA_PRIVATE_KEY`
* `AMOY_ETHERSCAN_API_KEY`
* `BASE_SEPOLIA_PRIVATE_KEY`
* `BASE_PRIVATE_KEY`

Block explorer:
* `MAINNET_ETHERSCAN_API_KEY`
* `SEPOLIA_ETHERSCAN_API_KEY`
* `OPTIMISM_ETHERSCAN_API_KEY`
* `BASESCAN_API_KEY`
* `BASESCAN_SEPOLIA_API_KEY`

Misc:
* `COINMARKETCAP_KEY`
* `REPORT_GAS`
* `DEFENDER_KEY`
* `DEFENDER_SECRET`

You can set this with the following command:

```bash
pnpm exec hardhat vars set NAME_OF_VARIABLE
```

## Deploying contracts

### Public networks  

Core contracts:

```bash
pnpm deploy:<network>
pnpm deploy:defender:<network> # deploy via openzeppelin defender
```

Where `<network>` is one of the: 
* `sepolia`

### Local network (e.g. Anvil or hardhat node)

Core Contracts:

```bash
pnpm deploy:local
```

For more scripts take a look at `package.json` in `packages/contracts` .

## Upgrading contracts

### Public networks

```bash
pnpm upgrade:<network>
pnpm upgrade:defender:<network> # upgrade via openzeppelin defender
```

Where `<network>` is one of the:
* `sepolia`

### Local network (e.g. Anvil or hardhat node)

```bash
pnpm upgrade:local

```
