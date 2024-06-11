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

      const isIpfsAvatar =
        data.Wallet.primaryDomain.avatar?.startsWith('ipfs://');

      const isHtttpsAvatar =
        data.Wallet.primaryDomain.avatar?.startsWith('https');

      return isHtttpsAvatar
        ? data.Wallet.primaryDomain.avatar!
        : isIpfsAvatar
          ? data.Wallet.primaryDomain.avatar!.replace(
              'ipfs://',
              'https://ipfs.io/ipfs/'
            )
          : data.Wallet.primaryDomain?.tokenNft?.contentValue?.image?.small ??
            null;
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
    case PlatformType.lens: {
      if (!data.lensSocials?.Social || data.lensSocials?.Social.length === 0) {
        return null;
      }
      // We take the first social (most followed one)
      const lens = data.lensSocials?.Social[0];
      if (!lens) return null;

      return lens.profileImageContentValue?.image?.small ?? null;
    }
    // For ethereum addresss we check first entry in each social
    case PlatformType.ethereum: {
      // ENS profile
      if (
        data?.Wallet?.primaryDomain?.avatar ||
        data?.Wallet?.primaryDomain?.tokenNft?.contentValue?.image?.small
      ) {
        const isIpfsAvatar =
          data.Wallet.primaryDomain.avatar?.startsWith('ipfs://');

        if (isIpfsAvatar) {
          return data.Wallet.primaryDomain.avatar!.replace(
            'ipfs://',
            'https://ipfs.io/ipfs/'
          );
        }

        const isHtttpsAvatar =
          data.Wallet.primaryDomain.avatar?.startsWith('https');

        return isHtttpsAvatar
          ? data.Wallet.primaryDomain.avatar!
          : data.Wallet.primaryDomain?.tokenNft?.contentValue?.image?.small ??
              null;
      }

      // Farcaster profile
      if (
        data?.farcasterSocials?.Social &&
        data.farcasterSocials?.Social.length > 0
      ) {
        if (
          data.farcasterSocials?.Social[0].profileImageContentValue?.image
            ?.small
        ) {
          return data.farcasterSocials?.Social[0].profileImageContentValue
            ?.image?.small;
        }
      }

      // Lens profile
      if (data?.lensSocials?.Social && data.lensSocials?.Social.length > 0) {
        if (
          data.lensSocials?.Social[0].profileImageContentValue?.image?.small
        ) {
          return data.lensSocials?.Social[0].profileImageContentValue?.image
            ?.small;
        }
      }

      return null;
    }
    default: {
      return null;
    }
  }
};
