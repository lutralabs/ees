import {
  GetMinimalProfileFromAddressDocument,
  type GetMinimalProfileFromAddressQuery,
} from '@/__generated__/airstack/graphql';

type GetMinimalProfileInfoByPlatformResult = {
  displayName: string | null;
  address: `0x${string}` | null;
  avatar: string | null;
};

export const getMinimalProfileFromAddress = async (
  address: `0x${string}`
): Promise<GetMinimalProfileInfoByPlatformResult> => {
  try {
    const result = await fetch(process.env.AIRSTACK_API_URL!, {
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
      next: { revalidate: 24 * 60 * 60 }, // Cache for 1 day
    });

    // Check if request was successful
    if (!result.ok) {
      return {
        displayName: null,
        address: address,
        avatar: null,
      };
    }

    const jsonResponse = await result.json();

    // Check if we successfully decoded the response
    if (!jsonResponse) {
      return {
        displayName: null,
        address: address,
        avatar: null,
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
        avatar: isHtttpsAvatar
          ? data.Wallet.primaryDomain.avatar!
          : isIpfsAvatar
            ? data.Wallet.primaryDomain.avatar!.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              )
            : data.Wallet.primaryDomain?.tokenNft?.contentValue?.image?.small ??
              null,
      };
    }

    // Lens profile
    if (data?.lensSocials?.Social?.length === 1) {
      return {
        displayName: data.lensSocials.Social[0].profileHandle ?? null,
        address: address,
        avatar:
          data.lensSocials.Social[0].profileImageContentValue?.image?.small ??
          null,
      };
    }

    // Farcaster profile
    if (data?.farcasterSocials?.Social?.length === 1) {
      return {
        displayName: data.farcasterSocials.Social[0].profileHandle ?? null,
        address: address,
        avatar:
          data.farcasterSocials.Social[0].profileImageContentValue?.image
            ?.small ?? null,
      };
    }

    return {
      displayName: null,
      address: address,
      avatar: null,
    };
  } catch (error) {
    return {
      displayName: null,
      address: address,
      avatar: null,
    };
  }
};
