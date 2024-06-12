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

### EESCore deployed contracts

* Mainnet: TODO
* Base: [0x6BbcC7D0E661a4f5441F74Dc0Ab324ac4327D940](https://basescan.org/address/0x6bbcc7d0e661a4f5441f74dc0ab324ac4327d940)
* Sepolia: [0x5Cb7f40d8a23d9Baff52cFd5A10994EcEfF9e7ED](https://sepolia.etherscan.io/address/0x5Cb7f40d8a23d9Baff52cFd5A10994EcEfF9e7ED)
* Base Sepolia: [0x63F610a03Caa82ca32386BDb6F447a93d4D6F6e7](https://sepolia.basescan.org/address/0x63F610a03Caa82ca32386BDb6F447a93d4D6F6e7)

For deployed EAS contracts see [EAS deployments](https://docs.attest.org/docs/quick--start/contracts)

Our deployed schemas can be found in [deploy script](packages/contracts/scripts/deployCore.ts#L12)
