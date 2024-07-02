import type { SearchListItemType } from './format';
import {
  PlatformSystem,
  PlatformType,
  SocialPlatformMapping,
} from './platform';
import { regexEns, regexEth, regexFarcaster, regexLens } from './regex';

export const discordUrl = 'https://discord.gg/M5xgNz7TTF';
export const githubUrl = 'https://github.com/lutralabs/ees';
export const twitterUrl = 'https://twitter.com/endorsedotfun';
export const SUGGESTED_ACCOUNTS: SearchListItemType[] = [
  {
    key: PlatformType.ens,
    label: 'vitalik.eth',
    icon: '/icons/icon-ens.svg',
  },
  {
    key: PlatformType.lens,
    label: 'stani.lens',
    icon: '/icons/icon-lens.svg',
  },
  {
    key: PlatformType.farcaster,
    label: 'jessepollak',
    icon: '/icons/icon-farcaster.svg',
  },
];
export const fuzzyDomainSuffix = [
  {
    key: PlatformType.ens,
    icon: SocialPlatformMapping(PlatformType.ens).icon,
    match: regexEns,
    suffixes: ['eth', 'xyz', 'app', 'luxe', 'kred', 'art', 'ceo', 'club'],
  },
  {
    key: PlatformType.farcaster,
    icon: SocialPlatformMapping(PlatformType.farcaster).icon,
    match: regexFarcaster,
    suffixes: ['eth', 'farcaster'],
  },
  {
    key: PlatformType.lens,
    icon: SocialPlatformMapping(PlatformType.lens).icon,
    match: regexLens,
    suffixes: ['lens'],
  },
  // ⬇️ Addresses
  {
    key: PlatformType.ethereum,
    icon: SocialPlatformMapping(PlatformType.ethereum).icon,
    match: regexEth,
    suffixes: null,
  },
];
export const defaultSearchSuffix = [
  {
    key: PlatformType.ens,
    label: 'eth',
    system: PlatformSystem.web3,
  },
  {
    key: PlatformType.lens,
    label: 'lens',
    system: PlatformSystem.web3,
  },
  {
    key: PlatformType.farcaster,
    label: '',
    optional: 'eth',
    system: PlatformSystem.web3,
  },
];
