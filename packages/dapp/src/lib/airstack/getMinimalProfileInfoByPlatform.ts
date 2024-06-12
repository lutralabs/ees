import {
  GetProfileFromEnsDocument,
  type GetProfileFromEnsQuery,
  GetProfileFromFarcasterDocument,
  GetProfileFromLensDocument,
  type GetProfileFromLensQuery,
  type GetProfileFromFarcasterQuery,
} from '@/__generated__/airstack/graphql';
import { PlatformType } from '@/utils';
import { isAddress } from 'viem';

type GetMinimalProfileInfoByPlatformResult = {
  displayName: string | null;
  address: `0x${string}` | null;
  description: string | null;
  avatar: string | null;
  error: string | null;
};

const getQueryForPlatform = (platform: PlatformType) => {
  switch (platform) {
    case PlatformType.ens:
      return GetProfileFromEnsDocument;
    case PlatformType.farcaster:
      return GetProfileFromFarcasterDocument;
    case PlatformType.lens:
      return GetProfileFromLensDocument;
    default:
      throw new Error('Unsupported platform');
  }
};

export const getMinimalProfileInfoByPlatform = async (
  platform: PlatformType,
  identity: string | null
): Promise<GetMinimalProfileInfoByPlatformResult> => {
  if (!identity) {
    return {
      displayName: null,
      address: null,
      description: null,
      avatar: null,
      error: null,
    };
  }

  try {
    const result: any = await fetch(process.env.AIRSTACK_API_URL!, {
      method: 'POST',
      headers: {
        Authorization: process.env.AIRSTACK_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getQueryForPlatform(platform),
        variables: {
          identity:
            platform === PlatformType.farcaster
              ? `fc_fname:${identity}`
              : identity,
        },
      }),
      next: { revalidate: 60 }, // Cache for 1 day
    });

    // Check if request was successful
    if (!result.ok) {
      throw new Error('Failed to fetch profile');
    }

    const jsonResponse = await result.json();

    // Check if we successfully decoded the response
    if (!jsonResponse) {
      throw new Error('Failed to fetch profile');
    }

    switch (platform) {
      case PlatformType.ens: {
        const data = jsonResponse.data as GetProfileFromEnsQuery;

        if (
          !data.Wallet ||
          !data.Wallet.primaryDomain ||
          !data.Wallet.addresses ||
          data.Wallet.addresses.length === 0
        ) {
          return {
            displayName: identity,
            address: null,
            description: null,
            avatar: null,
            error: 'No ENS profile found',
          };
        }

        const isIpfsAvatar =
          data.Wallet.primaryDomain.avatar?.startsWith('ipfs://');

        const isHtttpsAvatar =
          data.Wallet.primaryDomain.avatar?.startsWith('https');

        return {
          displayName: identity,
          address: data.Wallet.addresses[0],
          description: null,
          avatar: isHtttpsAvatar
            ? data.Wallet.primaryDomain.avatar!
            : isIpfsAvatar
              ? data.Wallet.primaryDomain.avatar!.replace(
                  'ipfs://',
                  'https://ipfs.io/ipfs/'
                )
              : data.Wallet.primaryDomain?.tokenNft?.contentValue?.image
                  ?.small ?? null,
          error: null,
        };
      }
      case PlatformType.farcaster: {
        const data = jsonResponse.data as GetProfileFromFarcasterQuery;
        const farcasterSocials = data.farcasterSocials?.Social;

        if (!farcasterSocials || farcasterSocials.length === 0) {
          return {
            displayName: null,
            address: null,
            description: null,
            avatar: null,
            error: 'No Farcaster profile found',
          };
        }

        let connectedAddresses = farcasterSocials[0].connectedAddresses;

        if (!connectedAddresses || connectedAddresses.length === 0) {
          return {
            displayName: null,
            address: null,
            description: null,
            avatar: null,
            error: "Farcaster profile doesn't have any connected addresses",
          };
        }

        // Double check that connected address is not the same as the farcaster user address
        // Remove the Farcaster user address from the addresses array
        connectedAddresses = connectedAddresses.filter(
          (connectedAddress) =>
            connectedAddress.address !== farcasterSocials[0].userAddress
        );

        // Also filter out all non-evm addresses
        connectedAddresses = connectedAddresses.filter((connectedAddress) =>
          isAddress(connectedAddress.address)
        );

        if (connectedAddresses.length === 0) {
          return {
            displayName: null,
            address: null,
            description: null,
            avatar: null,
            error:
              "Farcaster profile's connected address is the same as the farcaster user address",
          };
        }

        // Use ENS if available
        let mainAddress = data.Wallet?.primaryDomain?.resolvedAddress;

        // If ENS is not available, check if Lens is available
        if (!mainAddress) {
          if (data.lensSocials?.Social && data.lensSocials.Social.length > 0) {
            mainAddress = data.lensSocials.Social[0].userAddress;
          }
        }

        // If `mainAddress` is still null, use the last connected address
        if (!mainAddress) {
          mainAddress =
            connectedAddresses[connectedAddresses.length - 1].address;
        }

        return {
          displayName: identity,
          address: mainAddress,
          description: farcasterSocials[0].profileBio ?? null,
          avatar:
            farcasterSocials[0].profileImageContentValue?.image?.small ?? null,
          error: null,
        };
      }
      case PlatformType.lens: {
        const data = jsonResponse.data as GetProfileFromLensQuery;

        if (
          !data.lensSocials ||
          !data.lensSocials.Social ||
          data.lensSocials.Social.length === 0
        ) {
          return {
            displayName: null,
            address: null,
            description: null,
            avatar: null,
            error: 'No Lens profile found',
          };
        }

        if (
          !data.Wallet ||
          !data.Wallet.addresses ||
          data.Wallet.addresses.length === 0
        ) {
          return {
            displayName: null,
            address: null,
            description: null,
            avatar: null,
            error: 'No matching address for the Lens profile found',
          };
        }

        return {
          displayName: identity,
          address: data.Wallet.addresses[0],
          description: data.lensSocials.Social[0].profileBio ?? null,
          avatar:
            data.lensSocials.Social[0].profileImageContentValue?.image?.small ??
            null,
          error: null,
        };
      }
      default: {
        return {
          displayName: null,
          address: null,
          description: null,
          avatar: null,
          error: 'Unsupported platform',
        };
      }
    }
  } catch (error) {
    return {
      displayName: null,
      address: null,
      description: null,
      avatar: null,
      error: 'Unknown error',
    };
  }
};
