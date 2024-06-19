import {
  GetAggregatedAccountDataDocument,
  type GetAggregatedAccountDataQuery,
} from '@/__generated__/ees/graphql';
import { getGraphqlApiUrl } from './getGraphqlApiUrl';

type GetTopEndorsersAndDonatorsDocument = {
  totalEndorsementsReceived: string;
  totalEndorsementsSent: string;
  totalDonationsReceived: string;
  totalDonationsSent: string;
  error: string | null;
};

export const getAggregatedAccountData = async ({
  chainId,
  account,
}: {
  chainId: number;
  account: string;
}): Promise<GetTopEndorsersAndDonatorsDocument> => {
  try {
    const graphqlUrl = getGraphqlApiUrl(chainId);

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetAggregatedAccountDataDocument,
        variables: {
          account,
        },
      }),
      // Cache for 1 minute
      next: { revalidate: 60 },
    });

    // Check if request was successful
    if (!response.ok) {
      return {
        totalEndorsementsReceived: '0',
        totalEndorsementsSent: '0',
        totalDonationsReceived: '0',
        totalDonationsSent: '0',
        error: 'Failed to fetch data',
      };
    }

    const jsonResponse = await response.json();

    // Check if we successfully decoded the response
    if (!jsonResponse) {
      return {
        totalEndorsementsReceived: '0',
        totalEndorsementsSent: '0',
        totalDonationsReceived: '0',
        totalDonationsSent: '0',
        error: 'Failed to fetch data',
      };
    }

    const data = jsonResponse.data as GetAggregatedAccountDataQuery;

    return {
      totalEndorsementsReceived: data.account?.totalEndorsementsReceived ?? '0',
      totalEndorsementsSent: data.account?.totalEndorsementsSent ?? '0',
      totalDonationsReceived: data.account?.totalDonationsReceived ?? '0',
      totalDonationsSent: data.account?.totalDonationsSent ?? '0',
      error: null,
    };
  } catch (error) {
    return {
      totalEndorsementsReceived: '0',
      totalEndorsementsSent: '0',
      totalDonationsReceived: '0',
      totalDonationsSent: '0',
      error: 'Failed to fetch data',
    };
  }
};
