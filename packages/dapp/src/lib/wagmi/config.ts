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
    projectId: 'f68e3ee8babb84b20171ecabda673673', // FIXME: Create a production project
    appName: 'EES - Ethereum Endorsement Service',
    appDescription:
      'Endorse users and projects on Ethereum with a decentralized protocol leveraging EAS, and ENS.',
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

const DEVELOPMENT_CHAINS = [baseSepolia, sepolia, localhost];
const DEVELOPMENT_TRANSPORTS = {
  [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_ENDPOINT),
  [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_ENDPOINT),
  [localhost.id]: http(),
};

export const config = createConfig({
  ssr: true,
  chains: [
    base,
    ...(APP_ENV === 'development' || APP_ENV === 'staging'
      ? DEVELOPMENT_CHAINS
      : []),
  ],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_ENDPOINT),
    ...((APP_ENV === 'development' || APP_ENV === 'staging'
      ? DEVELOPMENT_TRANSPORTS
      : {}) as any),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [...connectors],
});
