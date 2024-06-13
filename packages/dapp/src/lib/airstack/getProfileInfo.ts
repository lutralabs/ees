import {
  GetProfileInfoDocument,
  type GetProfileInfoQuery,
  type GetProfileInfoQueryVariables,
} from '@/__generated__/airstack/graphql';
import { PlatformType } from '@/utils/platform';
import { notFound } from 'next/navigation';
import { isAddress } from 'viem';

export const getProfileInfo = async (
  identity: string,
  platform: PlatformType
): Promise<GetProfileInfoQuery> => {
  const variables: GetProfileInfoQueryVariables = {
    identity:
      platform === PlatformType.farcaster ? `fc_fname:${identity}` : identity,
  };

  const result = await fetch(process.env.AIRSTACK_API_URL!, {
    method: 'POST',
    headers: {
      Authorization: process.env.AIRSTACK_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GetProfileInfoDocument,
      variables,
    }),
    next: { revalidate: 86400 }, // Cache for 1 day
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

  const data = jsonResponse.data as GetProfileInfoQuery;

  // Check if root Wallet object exists
  if (!data.Wallet) return notFound();

  // Check if addresses array exists (even Farcaster should have at least one address)
  if (!data.Wallet.addresses || data.Wallet.addresses.length === 0) {
    return notFound();
  }

  // Extra validation for Farcaster
  if (platform === PlatformType.farcaster) {
    // Check if socials object exists
    if (
      !data.farcasterSocials?.Social ||
      data.farcasterSocials.Social.length === 0
    ) {
      return notFound();
    }

    const farcasterSocials = data.farcasterSocials.Social;

    // Check if the user has a connected address (in first social)
    if (
      !farcasterSocials[0].connectedAddresses ||
      farcasterSocials[0].connectedAddresses.length === 0
    ) {
      return notFound();
    }

    // Use ENS if available
    const primaryDomainAddress = data.Wallet.primaryDomain?.resolvedAddress;
    if (primaryDomainAddress) {
      data.Wallet.addresses = [primaryDomainAddress];
      return data;
    }

    // Use Lens if available
    if (data.lensSocials?.Social && data.lensSocials.Social.length > 0) {
      data.Wallet.addresses = [data.lensSocials.Social[0].userAddress];
      return data;
    }

    // Filter out the Farcaster user address and all non-evm addresses from the `connectedAddresses` array
    farcasterSocials[0].connectedAddresses =
      farcasterSocials[0].connectedAddresses.filter(
        (connectedAddress) =>
          connectedAddress.address !== farcasterSocials[0].userAddress &&
          isAddress(connectedAddress.address)
      );

    // If no addresses left after filtering, return not found
    if (farcasterSocials[0].connectedAddresses.length === 0) {
      return notFound();
    }

    // Use the first address in the `connectedAddresses` array
    data.Wallet.addresses = [farcasterSocials[0].connectedAddresses[0].address];
  }

  return data;
};
