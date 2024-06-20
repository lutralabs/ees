type SocialPlatform = {
  key: string;
  color: string;
  bgColor?: string;
  icon: string;
  label: string;
  urlPrefix?: string;
  ensText?: string[];
  dotbitText?: string[];
  system: PlatformSystem;
};

export enum PlatformSystem {
  web2 = 0,
  web3 = 1,
}

export enum PlatformType {
  ens = 'ens',
  lens = 'lens',
  ethereum = 'ethereum',
  twitter = 'twitter',
  github = 'github',
  farcaster = 'farcaster',
  discord = 'discord',
  linkedin = 'linkedin',
  hey = 'hey',
  website = 'website',
}

export const PLATFORM_DATA: { [key in PlatformType]: SocialPlatform } = {
  [PlatformType.twitter]: {
    key: PlatformType.twitter,
    color: '#4A99E9',
    icon: '/icons/icon-twitter.svg',
    label: 'Twitter',
    urlPrefix: 'https://twitter.com/',
    ensText: ['com.twitter', 'vnd.twitter', 'twitter'],
    dotbitText: ['profile.twitter'],
    system: PlatformSystem.web2,
  },
  [PlatformType.ens]: {
    key: PlatformType.ens,
    color: '#5298FF',
    bgColor: '#DBEDFF',
    icon: '/icons/icon-ens.svg',
    label: 'ENS',
    urlPrefix: 'https://app.ens.domains/',
    system: PlatformSystem.web3,
  },
  [PlatformType.ethereum]: {
    key: PlatformType.ethereum,
    color: '#3741ba',
    bgColor: '#E2E8F0',
    icon: '/icons/icon-ethereum.svg',
    label: 'Ethereum',
    urlPrefix: 'https://etherscan.io/address/',
    system: PlatformSystem.web3,
  },
  [PlatformType.website]: {
    key: PlatformType.website,
    color: '#3741ba',
    bgColor: '#E2E8F0',
    icon: '/icons/icon-website.svg',
    label: 'Website',
    urlPrefix: 'https://',
    system: PlatformSystem.web2,
  },
  [PlatformType.farcaster]: {
    key: PlatformType.farcaster,
    color: '#8a63d2',
    bgColor: '#F3E8FF',
    icon: '/icons/icon-farcaster.svg',
    label: 'Farcaster',
    urlPrefix: 'https://warpcast.com/',
    ensText: ['farcaster'],
    system: PlatformSystem.web2,
  },
  [PlatformType.github]: {
    key: PlatformType.github,
    color: '#000000',
    icon: '/icons/icon-github.svg',
    label: 'GitHub',
    urlPrefix: 'https://github.com/',
    ensText: ['com.github', 'vnd.github'],
    dotbitText: ['profile.github'],
    system: PlatformSystem.web2,
  },
  [PlatformType.lens]: {
    key: PlatformType.lens,
    color: '#6bc674',
    bgColor: '#E2FFE5',
    icon: '/icons/icon-lens.svg',
    label: 'Lens',
    urlPrefix: 'https://www.lensfrens.xyz/',
    system: PlatformSystem.web2,
  },
  [PlatformType.discord]: {
    key: PlatformType.discord,
    color: '#5865f2',
    icon: '/icons/icon-discord.svg',
    label: 'Discord',
    urlPrefix: '',
    ensText: ['com.discord'],
    dotbitText: ['profile.discord'],
    system: PlatformSystem.web2,
  },
  [PlatformType.linkedin]: {
    key: PlatformType.linkedin,
    color: '#195DB4',
    icon: '/icons/icon-linkedin.svg',
    label: 'LinkedIn',
    ensText: ['com.linkedin'],
    urlPrefix: 'https://www.linkedin.com/in/',
    dotbitText: ['profile.linkedin'],
    system: PlatformSystem.web2,
  },
  [PlatformType.hey]: {
    key: PlatformType.hey,
    color: '#E84F64',
    icon: '/icons/icon-hey.svg',
    label: 'Hey',
    urlPrefix: 'https://hey.xyz/u/',
    ensText: ['lens'],
    system: PlatformSystem.web3,
  },
};

export const SOCIALS: {
  [key in PlatformType]?: Pick<
    SocialPlatform,
    'key' | 'color' | 'icon' | 'label' | 'urlPrefix' | 'bgColor'
  >;
} = {
  [PlatformType.twitter]: {
    key: PlatformType.twitter,
    color: '#4A99E9',
    icon: '/icons/icon-twitter.svg',
    label: 'Twitter',
    urlPrefix: 'https://twitter.com/endorsedotfun',
  },
  [PlatformType.lens]: {
    key: PlatformType.lens,
    color: '#6bc674',
    bgColor: '#E2FFE5',
    icon: '/icons/icon-hey.svg',
    label: 'Lens',
    urlPrefix: 'https://hey.xyz/u/endorsedotfun',
  },
  [PlatformType.farcaster]: {
    key: PlatformType.farcaster,
    color: '#8a63d2',
    bgColor: '#F3E8FF',
    icon: '/icons/icon-farcaster.svg',
    label: 'Farcaster',
    urlPrefix: 'https://warpcast.com/endorsedotfun',
  },
  [PlatformType.discord]: {
    key: PlatformType.discord,
    color: '#5865f2',
    icon: '/icons/icon-discord.svg',
    label: 'Discord',
    urlPrefix: 'https://discord.gg/M5xgNz7TTF',
  },
  [PlatformType.github]: {
    key: PlatformType.github,
    color: '#000000',
    icon: '/icons/icon-github.svg',
    label: 'GitHub',
    urlPrefix: 'https://github.com/lutralabs/ees',
  },
};

export const validateOrGetDefaultPlatform = (
  platform: string | undefined | null
): PlatformType => {
  if (!platform) return PlatformType.ens;
  // Check if the platform is valid
  const lowercasePlatform = platform.toLowerCase();

  if (Object.values(PlatformType).includes(lowercasePlatform as PlatformType)) {
    return PlatformType[lowercasePlatform as keyof typeof PlatformType];
  }

  // If the platform is not valid, return the default platform
  return PlatformType.ens;
};

export const SocialPlatformMapping = (platform: PlatformType) => {
  return (
    PLATFORM_DATA[platform] ?? {
      key: platform,
      color: '#000000',
      icon: '',
      label: platform,
      ensText: [],
    }
  );
};
