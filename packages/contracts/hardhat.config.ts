import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-foundry';
import '@openzeppelin/hardhat-upgrades';
import '@nomicfoundation/hardhat-ignition-ethers';
import '@nomicfoundation/hardhat-verify';
import { vars } from 'hardhat/config';

const getAccounts = (network: string) => {
  switch (network) {
    case 'sepolia': {
      const account =
        process.env.SEPOLIA_PRIVATE_KEY || vars.get('SEPOLIA_PRIVATE_KEY', '');
      return account ? [`0x${account}`] : [];
    }
    case 'amoy': {
      const account =
        process.env.AMOY_PRIVATE_KEY || vars.get('AMOY_PRIVATE_KEY', '');
      return account ? [`0x${account}`] : [];
    }
    case 'baseSepolia': {
      const account =
        process.env.BASE_SEPOLIA_PRIVATE_KEY ||
        vars.get('BASE_SEPOLIA_PRIVATE_KEY', '');
      return account ? [`0x${account}`] : [];
    }
    case 'base': {
      const account =
        process.env.BASE_PRIVATE_KEY || vars.get('BASE_PRIVATE_KEY', '');
      return account ? [`0x${account}`] : [];
    }
    default:
      return [];
  }
};
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  paths: {
    sources: './src',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100000,
          },
        },
      },
    ],
  },
  defender: {
    apiKey: process.env.DEFENDER_KEY || vars.get('DEFENDER_KEY', ''),
    apiSecret: process.env.DEFENDER_SECRET || vars.get('DEFENDER_SECRET', ''),
  },
  networks: {
    hardhat: {
      hardfork: 'cancun',
      forking: {
        url:
          process.env.SEPOLIA_RPC_URL ||
          vars.get(
            'SEPOLIA_RPC_URL',
            'https://ethereum-sepolia-rpc.publicnode.com'
          ),
        blockNumber: 6037898,
      },
      blockGasLimit: 12000000,
      initialBaseFeePerGas: 5000000000,
      gasPrice: 7000000000,
    },
    sepolia: {
      chainId: 11155111,
      url:
        process.env.SEPOLIA_RPC_URL ||
        vars.get(
          'SEPOLIA_RPC_URL',
          'https://ethereum-sepolia-rpc.publicnode.com'
        ),
      accounts: getAccounts('sepolia'),
    },
    base: {
      chainId: 8453,
      url: 'https://mainnet.base.org',
      accounts: getAccounts('base'),
      gasPrice: 1000000000,
    },
    baseSepolia: {
      chainId: 84532,
      url: 'https://sepolia.base.org',
      accounts: getAccounts('baseSepolia'),
      gasPrice: 1000000000,
    },
    amoy: {
      chainId: 80002,
      url:
        process.env.AMOY_RPC_URL ||
        vars.get('AMOY_RPC_URL', 'https://rpc-amoy.polygon.technology/'),
      accounts: getAccounts('amoy'),
    },
    local: {
      url: 'http://127.0.0.1:8545',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
  },
  gasReporter: {
    currency: 'USD',
    coinmarketcap:
      process.env.COINMARKETCAP_KEY || vars.get('COINMARKETCAP_KEY', ''),
    enabled: !!process.env.REPORT_GAS || !!vars.get('REPORT_GAS', ''),
    token: 'ETH',
    L1: 'ethereum',
    L2: 'optimism',
    L1Etherscan:
      process.env.ETHERSCAN_API_KEY || vars.get('ETHERSCAN_API_KEY', ''),
    L2Etherscan:
      process.env.OPTIMISM_ETHERSCAN_API_KEY ||
      vars.get('OPTIMISM_ETHERSCAN_API_KEY', ''),
  },
  etherscan: {
    apiKey: {
      mainnet:
        process.env.ETHERSCAN_API_KEY || vars.get('ETHERSCAN_API_KEY', ''),
      sepolia:
        process.env.SEPOLIA_ETHERSCAN_API_KEY ||
        vars.get('SEPOLIA_ETHERSCAN_API_KEY', ''),
      amoy:
        process.env.AMOY_ETHERSCAN_API_KEY ||
        vars.get('AMOY_ETHERSCAN_API_KEY', ''),
      base: process.env.BASESCAN_API_KEY || vars.get('BASESCAN_API_KEY', ''),
      baseSepolia:
        process.env.BASESCAN_SEPOLIA_API_KEY ||
        vars.get('BASESCAN_SEPOLIA_API_KEY', ''),
    },
  },
  mocha: {
    timeout: 80000,
  },
};

export default config;
