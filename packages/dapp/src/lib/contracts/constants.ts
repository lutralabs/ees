import { APP_ENV } from '@/utils/appEnv';

/**
 * Default chain ID
 *
 * Used when user is not connected to a wallet
 */

const getDefaultChainId = () => {
  if (APP_ENV === 'development') {
    return 11155111;
  }

  if (APP_ENV === 'staging') {
    return 11155111;
  }

  return 8453;
};

export const DEFAULT_CHAIN_ID = getDefaultChainId();
