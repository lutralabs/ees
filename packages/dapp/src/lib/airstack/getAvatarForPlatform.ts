import type { GetProfileInfoQuery } from '@/__generated__/airstack/graphql';
import { PlatformType } from '@/utils/platform';

export const getAvatarForPlatform = (
  data: GetProfileInfoQuery,
  platform: PlatformType
) => {
  switch (platform) {
    case PlatformType.ens: {
      // Check if primary domain is set
      if (!data.Wallet?.primaryDomain) return null;
      // Check if tokenNft is set
      const tokenNft =
        data.Wallet.primaryDomain.tokenNft?.contentValue?.image?.small;
      if (tokenNft) return tokenNft;
      // Check if avatar is set
      const avatar = data.Wallet.primaryDomain.avatar;

      return avatar ?? null;
    }
    case PlatformType.lens: {
      if (!data.lensSocials?.Social || data.lensSocials?.Social.length === 0) {
        return null;
      }
      // We take the first social (most followed one)
      const lens = data.lensSocials?.Social[0];
      if (!lens) return null;

      return lens.profileImageContentValue?.image?.small ?? null;
    }

    case PlatformType.farcaster: {
      if (
        !data.farcasterSocials?.Social ||
        data.farcasterSocials?.Social.length === 0
      ) {
        return null;
      }
      // We take the first social (most followed one)
      const farcaster = data.farcasterSocials?.Social[0];
      if (!farcaster) return null;
      return farcaster.profileImageContentValue?.image?.small ?? null;
    }
    default:
      return null;
  }
};
