import {
  GetRecentEndorsementsAndDonationsDocument,
  type GetRecentEndorsementsAndDonationsQuery,
} from '@/__generated__/ees/graphql';

import { getGraphqlApiUrl } from './getGraphqlApiUrl';
import {
  type GetMinimalProfileFromAddressResult,
  getMinimalProfileFromAddress,
} from '../airstack/getMinimalProfileFromAddress';
import { getAttestationComment } from '../eas/getAttestationComment';
import { CHAIN_ID_TO_NETWORK_NAME } from '@/utils';
import { DEFAULT_CHAIN_ID } from '../contracts';

export type RecentEndorsementType = {
  id: string;
  endorsementType: string;
  createdAtTimestamp: string;
  easUid: string;
  from: GetMinimalProfileFromAddressResult;
  to: GetMinimalProfileFromAddressResult;
  comment: string | null;
};

export type RecentDonationType = {
  id: string;
  createdAtTimestamp: string;
  amount: string;
  from: GetMinimalProfileFromAddressResult;
  to: GetMinimalProfileFromAddressResult;
};

type RecentEndorsementsAndDonationsResult = {
  endorsements: RecentEndorsementType[] | null;
  donations: RecentDonationType[] | null;
  error: string | null;
};

export const getRecentEndorsementsAndDonationsClient = async (
  chainId: number
): Promise<RecentEndorsementsAndDonationsResult> => {
  try {
    let network = CHAIN_ID_TO_NETWORK_NAME[chainId ?? DEFAULT_CHAIN_ID];
    network = network ?? CHAIN_ID_TO_NETWORK_NAME[DEFAULT_CHAIN_ID];

    const response = await fetch(
      `/api/ees/recentEndorsementsAndDonations?network=${network}`,
      {
        method: 'GET',
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      return {
        endorsements: null,
        donations: null,
        error: 'Failed to fetch recent data.',
      };
    }

    const jsonResponse = await response.json();

    if (!jsonResponse) {
      return {
        endorsements: null,
        donations: null,
        error: 'Failed to fetch recent data.',
      };
    }

    return jsonResponse;
  } catch (error) {
    return {
      endorsements: null,
      donations: null,
      error: 'Failed to fetch recent data.',
    };
  }
};

export const getEndorsementsAndDonationsServer = async (
  chainId: number
): Promise<RecentEndorsementsAndDonationsResult> => {
  try {
    const graphqlApiUrl = getGraphqlApiUrl(chainId);

    const response = await fetch(graphqlApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: GetRecentEndorsementsAndDonationsDocument,
      }),
      // Cache for 30 seconds
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return {
        endorsements: null,
        donations: null,
        error: 'Failed to fetch recent data.',
      };
    }

    const jsonResponse = await response.json();

    if (!jsonResponse) {
      return {
        endorsements: null,
        donations: null,
        error: 'Failed to fetch recent data.',
      };
    }

    const data = jsonResponse.data as GetRecentEndorsementsAndDonationsQuery;

    // Fetch Airstack identity information and EAS attestations for comments
    const endorsementResults = await Promise.allSettled(
      data.endorsements.map(async (endorsement) => {
        const from = await getMinimalProfileFromAddress(endorsement.from.id);

        const to = await getMinimalProfileFromAddress(endorsement.to.id);

        const comment = await getAttestationComment({
          chainId,
          id: endorsement.easUid,
        });

        return {
          id: endorsement.id,
          endorsementType: endorsement.endorsementType,
          createdAtTimestamp: endorsement.createdAtTimestamp,
          easUid: endorsement.easUid,
          from,
          to,
          comment,
        };
      })
    );

    const donationResults = await Promise.allSettled(
      data.donations.map(async (donation) => {
        const from = await getMinimalProfileFromAddress(donation.from.id);

        const to = await getMinimalProfileFromAddress(donation.to.id);

        return {
          id: donation.id,
          createdAtTimestamp: donation.createdAtTimestamp,
          amount: donation.amount,
          from,
          to,
        };
      })
    );

    // Filter out any rejected promises
    const endorsements = endorsementResults
      .filter((result) => result.status === 'fulfilled')
      .map((result: any) => result.value);

    const donations = donationResults
      .filter((result) => result.status === 'fulfilled')
      .map((result: any) => result.value);

    return {
      endorsements,
      donations,
      error: null,
    };
  } catch (error) {
    return {
      endorsements: null,
      donations: null,
      error: 'Failed to fetch recent data.',
    };
  }
};
