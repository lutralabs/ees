import { DEFAULT_CHAIN_ID } from '@/lib/contracts';
import { APP_ENV } from './appEnv';

// Needs to match the WAGMI config in `lib/wagmi/config.ts`
const PROD_NETWORKS = ['base'];
const STAGING_NETWORKS = ['sepolia', 'base-sepolia', ...PROD_NETWORKS];
const DEVELOPMENT_NETWORKS = ['localhost', ...STAGING_NETWORKS];

export const NETWORK_NAME_TO_CHAIN_ID: { [key: string]: number } = {
  // Production
  base: 8453,
  // Staging
  sepolia: 11155111,
  'base-sepolia': 84532,
  // Local development
  localhost: 1337,
};

export const CHAIN_ID_TO_NETWORK_NAME: { [key: number]: string } = {
  // Production
  8453: 'base',
  // Staging
  11155111: 'sepolia',
  84532: 'base-sepolia',
  // Local development
  1337: 'localhost',
};

export const validateOrGetDefaultNetwork = (
  network: string | undefined
): number => {
  if (!network) return DEFAULT_CHAIN_ID;

  // Check if the network is valid
  const lowercaseNetwork = network.toLowerCase();

  if (
    APP_ENV === 'development' &&
    DEVELOPMENT_NETWORKS.includes(lowercaseNetwork)
  ) {
    return NETWORK_NAME_TO_CHAIN_ID[lowercaseNetwork];
  }

  if (APP_ENV === 'staging' && STAGING_NETWORKS.includes(lowercaseNetwork)) {
    return NETWORK_NAME_TO_CHAIN_ID[lowercaseNetwork];
  }

  if (PROD_NETWORKS.includes(lowercaseNetwork)) {
    return NETWORK_NAME_TO_CHAIN_ID[lowercaseNetwork];
  }

  // If the network is not valid, return the default network
  return DEFAULT_CHAIN_ID;
};
