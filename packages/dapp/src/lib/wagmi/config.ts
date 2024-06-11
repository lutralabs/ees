import { createConfig, http } from 'wagmi';
import { cookieStorage, createStorage } from 'wagmi';
import { base, baseSepolia, localhost, sepolia } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { APP_ENV } from '@/utils/appEnv';

coinbaseWallet.preference = 'all';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [
        rainbowWallet,
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  {
    projectId: '94edd1d8986f8dac6fb7aa72bcb85e27',
    appName: 'endorse.fun',
    appDescription: 'The next upgrade for Web3 social layer.',
    appUrl:
      APP_ENV === 'development'
        ? 'http://localhost:3000'
        : APP_ENV === 'staging'
          ? 'https://staging.endorse.fun'
          : 'https://endorse.fun',
    appIcon:
      APP_ENV === 'development'
        ? 'http://localhost:3000/EES_logo.svg'
        : APP_ENV === 'staging'
          ? 'https://staging.endorse.fun/EES_logo.svg'
          : 'https://endorse.fun/EES_logo.svg',
  }
);

const PROD_CHAINS = [base] as const;
const STAGING_CHAINS = [sepolia, baseSepolia, ...PROD_CHAINS] as const;
const DEVELOPMENT_CHAINS = [localhost, ...STAGING_CHAINS] as const;

const PROD_TRANSPORTS = {
  [base.id]: http(process.env.NEXT_PUBLIC_BASE_ENDPOINT),
};
const STAGING_TRANSPORTS = {
  [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_ENDPOINT),
  [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_ENDPOINT),
  ...PROD_TRANSPORTS,
};
const DEVELOPMENT_TRANSPORTS = {
  [localhost.id]: http(),
  ...STAGING_TRANSPORTS,
};

export const config = createConfig({
  ssr: true,
  chains: [
    ...(APP_ENV === 'development'
      ? DEVELOPMENT_CHAINS
      : APP_ENV === 'staging'
        ? STAGING_CHAINS
        : PROD_CHAINS),
  ],
  transports: {
    ...((APP_ENV === 'development'
      ? DEVELOPMENT_TRANSPORTS
      : APP_ENV === 'staging'
        ? STAGING_TRANSPORTS
        : PROD_TRANSPORTS) as any),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [...connectors],
});
