import type { GetProfileInfoQuery } from '@/__generated__/airstack/graphql';
import { PlatformType } from '@/utils/platform';

const EMPTY_RESULT = {
  name: null,
  handle: null,
  description: null,
};

export const getBasicPlatformProfileInfo = (
  data: GetProfileInfoQuery,
  platform: PlatformType
) => {
  switch (platform) {
    case PlatformType.ens: {
      // Check if primary domain is set
      if (!data.Wallet?.primaryDomain) return EMPTY_RESULT;

      return {
        name: data.Wallet.primaryDomain.name ?? null,
        handle: data.Wallet.primaryDomain.name ?? null,
        description: null,
      };
    }
    case PlatformType.lens: {
      if (!data.lensSocials?.Social || data.lensSocials?.Social.length === 0) {
        return EMPTY_RESULT;
      }
      // We take the first social (most followed one)
      const lens = data.lensSocials?.Social[0];
      if (!lens) return EMPTY_RESULT;

      return {
        name: lens.profileDisplayName ?? null,
        handle: lens.profileHandle ?? null,
        description: lens.profileBio ?? null,
      };
    }

    case PlatformType.farcaster: {
      if (
        !data.farcasterSocials?.Social ||
        data.farcasterSocials?.Social.length === 0
      ) {
        return EMPTY_RESULT;
      }
      // We take the first social (most followed one)
      const farcaster = data.farcasterSocials?.Social[0];
      if (!farcaster) return EMPTY_RESULT;

      return {
        name: farcaster.profileName ?? null,
        handle: farcaster.profileHandle ?? null,
        description: farcaster.profileBio ?? null,
      };
    }
    default:
      return EMPTY_RESULT;
  }
};
