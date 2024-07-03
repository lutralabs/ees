import {
  GetMinimalProfileFromAddressDocument,
  type GetMinimalProfileFromAddressQuery,
} from '@/__generated__/airstack/graphql';

export type GetMinimalProfileFromAddressResult = {
  displayName: string | null;
  address: `0x${string}` | null;
  description: string | null;
  avatar: string | null;
  error: string | null;
};

export const getMinimalProfileFromAddress = async (
  address: `0x${string}` | null
): Promise<GetMinimalProfileFromAddressResult> => {
  if (!address) {
    return {
      displayName: null,
      address: null,
      description: null,
      avatar: null,
      error: 'No address provided',
    };
  }

  try {
    const response = await fetch(process.env.AIRSTACK_API_URL!, {
      method: 'POST',
      headers: {
        Authorization: process.env.AIRSTACK_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetMinimalProfileFromAddressDocument,
        variables: {
          identity: address,
        },
      }),
      next: { revalidate: 86400 }, // Cache for 1 day
    });

    // Check if request was successful
    if (!response.ok) {
      return {
        displayName: null,
        address: address,
        description: null,
        avatar: null,
        error: 'Failed to fetch profile',
      };
    }

    const jsonResponse = await response.json();

    // Check if we successfully decoded the response
    if (!jsonResponse) {
      return {
        displayName: null,
        address: address,
        description: null,
        avatar: null,
        error: 'Failed to fetch profile',
      };
    }

    const data = jsonResponse.data as GetMinimalProfileFromAddressQuery;

    // ENS profile
    if (data.Wallet?.primaryDomain?.name) {
      const isIpfsAvatar =
        data.Wallet.primaryDomain.avatar?.startsWith('ipfs://');

      const isHtttpsAvatar =
        data.Wallet.primaryDomain.avatar?.startsWith('https');

      return {
        displayName: data.Wallet.primaryDomain.name ?? null,
        address: address,
        description: null,
        avatar: isHtttpsAvatar
          ? data.Wallet.primaryDomain.avatar!
          : isIpfsAvatar
            ? data.Wallet.primaryDomain.avatar!.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              )
            : data.Wallet.primaryDomain?.tokenNft?.contentValue?.image?.small ??
              null,
        error: null,
      };
    }

    // Farcaster profile
    if (data?.farcasterSocials?.Social?.length === 1) {
      return {
        displayName: data.farcasterSocials.Social[0].profileHandle ?? null,
        address: address,
        description: data.farcasterSocials.Social[0].profileBio ?? null,
        avatar:
          data.farcasterSocials.Social[0].profileImageContentValue?.image
            ?.small ?? null,
        error: null,
      };
    }

    // Lens profile
    if (data?.lensSocials?.Social?.length === 1) {
      return {
        displayName: data.lensSocials.Social[0].profileHandle ?? null,
        address: address,
        description: data.lensSocials.Social[0].profileBio ?? null,
        avatar:
          data.lensSocials.Social[0].profileImageContentValue?.image?.small ??
          null,
        error: null,
      };
    }

    return {
      displayName: null,
      address: address,
      description: null,
      avatar: null,
      error: null,
    };
  } catch (error) {
    return {
      displayName: null,
      address: address,
      description: null,
      avatar: null,
      error: 'Failed to fetch profile',
    };
  }
};
